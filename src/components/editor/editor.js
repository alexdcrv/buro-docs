import React, { useEffect, useState } from 'react'
import {ContentState, convertFromHTML,  EditorState, getDefaultKeyBinding,RichUtils} from 'draft-js'
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import imageUpload from './fileUpload';
import createImagePlugin from '@draft-js-plugins/image';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload';
import {stateToHTML} from "draft-js-export-html"
import './editor.css'
import ImageAdd from './imageAddFunc'
import { useDispatch, useSelector } from 'react-redux';
import { fileSave } from '../../redux/actions/dataOperations';
	const focusPlugin = createFocusPlugin();
	const resizeablePlugin = createResizeablePlugin();
	const blockDndPlugin = createBlockDndPlugin();
	const alignmentPlugin = createAlignmentPlugin();
	const decorator = composeDecorators(
		resizeablePlugin.decorator,
		alignmentPlugin.decorator,
		focusPlugin.decorator,
		blockDndPlugin.decorator
	);
	const imagePlugin = createImagePlugin({ decorator });
	
	const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
		handleUpload: imageUpload,
		addImage: imagePlugin.addImage,
	});
	
	const plugins = [
		dragNDropFileUploadPlugin,
		blockDndPlugin,
		focusPlugin,
		alignmentPlugin,
		resizeablePlugin,
		imagePlugin,
	];
const TextEditor =()=> {
	
	// const { AlignmentTool } = alignmentPlugin;
	
	const [editorState, setEditorState] = useState('')
	
	
	
	const dispatch = useDispatch()
	
	const [htmlState, setHtmlState] = useState('')
	const [rawState, setRawState] = useState('')
	const [className, setClassName] = useState('')
	const file = useSelector (state => state.dataOperations.file)
	  const focus = (e) => e.target.focus();
	  const onChange = (editorState) => {
		setEditorState(editorState)
		// console.log(editorState) 
		let options = {
			entityStyleFn: (entity) => {
			  const entityType = entity.get('type').toLowerCase();
			  if (entityType === 'image') {
				const data = entity.getData();
				return {
				  element: 'img',
				  attributes: {
					src: data.src,
					width: data.width+'%'
				  },
				
				};
			  }
			},
		  };
		  let html = stateToHTML(editorState.getCurrentContent(), options);
		  let raw = stateToHTML(editorState.getCurrentContent());
		 setHtmlState(html)
		 setRawState(raw)
			// console.log(htmlState) 
		
	};
	
	useEffect(()=>{
		if(file!=='') {
			
			const blocksFromRaw = convertFromHTML(file.editorState)
			const state = ContentState.createFromBlockArray(
				blocksFromRaw.contentBlocks,
				blocksFromRaw.entityMap,
			  );
			setEditorState(EditorState.createWithContent(state))
			
		}
		else if(file==='') {
		
			setEditorState(EditorState.createEmpty())
			
		}
		
	},[])

	const handleKeyCommand =(command, editorState)=> {
	  const newState = RichUtils.handleKeyCommand(editorState, command);
	  if (newState) {
		onChange(newState);
	
		return true;
	  }
	  return false;
	}
	const saveFile =()=>{
		dispatch(fileSave(file.folder,file.name,rawState,htmlState))
	}

	const mapKeyToEditorCommand=(e)=> {
	  if (e.keyCode === 9) {
		const newEditorState = RichUtils.onTab(
		  e, editorState, 4,
		);
		if (newEditorState !== editorState) {
		  onChange(newEditorState);
		}
		return;
	  }
	  return getDefaultKeyBinding(e);
	}

	const toggleBlockType =(blockType)=> {
	  onChange(
		RichUtils.toggleBlockType(
		  editorState,
		  blockType
		)
	  );
	}

	const toggleInlineStyle=(inlineStyle)=> {
	  onChange(
		RichUtils.toggleInlineStyle(
		  editorState,
		  inlineStyle
		)
	  );
	}
	useEffect(()=>{
		// console.log(plugins)
		if(editorState!==''){
				setClassName ('RichEditor-editor')
				let contentState = editorState.getCurrentContent();
				if (!contentState.hasText()) {
					if (contentState.getBlockMap().first().getType() !== 'unstyled') {
					setClassName (className+' RichEditor-hidePlaceholder');
					}
				}
	
	  }
	},[])
	  

	  return (<>
	  
		{editorState!=='' && <div className="RichEditor-root">
		  <BlockStyleControls
			editorState={editorState}
			onToggle={toggleBlockType}
		  />
		  <div style={{display:'flex',borderBottom: '1px solid #999', marginBottom:'20px'}}>
			   <InlineStyleControls
					editorState={editorState}
					onToggle={toggleInlineStyle}
				/> 
				<ImageAdd
					editorState={editorState}
					onChange={onChange}
					modifier={imagePlugin.addImage}
        />
		<div className='RichEditor-styleButton'onClick={saveFile} style={{marginLeft:'15px',marginTop:'0px',fontSize:'14px', color:'black'}}>Сохранить</div>
		  </div>
		 
		<div className={className} onClick={focus}>
			<Editor
			  blockStyleFn={getBlockStyle}
			  customStyleMap={styleMap}
			  editorState={editorState}
			  handleKeyCommand={handleKeyCommand}
			  keyBindingFn={mapKeyToEditorCommand}
			  onChange={onChange}
			  spellCheck={true}
			  plugins={plugins}
			  ref={(element) => element}
			/>
			</div>
		</div>}
		</>
	  );
	}
  

  // Custom overrides for "code" style.
  const styleMap = {
	CODE: {
	  backgroundColor: 'rgba(0, 0, 0, 0.05)',
	  fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
	  fontSize: 16,
	  padding: 2,
	},
  };

  
  function getBlockStyle(block) {
	switch (block.getType()) {
	  case 'blockquote': return 'RichEditor-blockquote';
	  default: return null;
	}
  }

//   const StyleButton =(props)=> {
// 	  const [className,setClassName] =useState('')
// 	  const onToggle = (e) => {
// 		  console.log(e.target)
// 		e.preventDefault();
// 		onToggle(props.style);
// 	  };
	

// 	useEffect(()=>{
// 		setClassName('RichEditor-styleButton')
// 		if (props.active) {
// 			setClassName(className += ' RichEditor-activeButton')
// 		}
// 	})
	 

// 	  return (
// 		<span className={className} tabIndex={1} onMouseDown={(e)=>onToggle(e)}>
// 		  {props.label}
// 		</span>
// 	  );
// 	}
  
class StyleButton extends React.Component {
	constructor() {
	  super();
	  this.onToggle = (e) => {
		e.preventDefault();
		this.props.onToggle(this.props.style);
	  };
	}

	render() {
	  let className = 'RichEditor-styleButton';
	  if (this.props.active) {
		className += ' RichEditor-activeButton';
	  }

	  return (
		<span className={className} onMouseDown={this.onToggle}>
		  {this.props.label}
		</span>
	  );
	}
  }
  const BLOCK_TYPES = [
	{label: 'Заголовок', style: 'header-one'},
	{label: 'Подаголовок', style: 'header-two'},
	// {label: '', style: 'header-three'},
	{label: 'Блокнот', style: 'blockquote'},
	{label: 'Ненумерованный список', style: 'unordered-list-item'},
	{label: 'Нумерованный список', style: 'ordered-list-item'},
  ];

  const BlockStyleControls = (props) => {
	if(props.editorState!==''){
		const {editorState} = props;
		const selection = editorState.getSelection();
		const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

		return (
		<div className="RichEditor-controls">
			{BLOCK_TYPES.map((type) =>
			<StyleButton
				key={type.label}
				active={type.style === blockType}
				label={type.label}
				onToggle={props.onToggle}
				style={type.style}
			/>
			)}
		</div>
		);
	}
		
  };

  var INLINE_STYLES = [
	{label: 'Жирный', style: 'BOLD'},
	{label: 'Курсив', style: 'ITALIC'},
	{label: 'Подчеркнутый', style: 'UNDERLINE'},
	{label: 'Выделенный', style: 'CODE'},
  ];
 
  const InlineStyleControls = (props) => {
	if(props.editorState!==''){
		const currentStyle = props.editorState.getCurrentInlineStyle();
		return (
		<div className="RichEditor-controls">
			{INLINE_STYLES.map((type) =>
			<StyleButton
				key={type.label}
				active={currentStyle.has(type.style)}
				label={type.label}
				onToggle={props.onToggle}
				style={type.style}
			/>
			)}
		</div>
		);
	}
  };


   export default TextEditor