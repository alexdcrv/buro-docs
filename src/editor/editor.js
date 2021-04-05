import React from 'react'
import {EditorState, getDefaultKeyBinding,RichUtils} from 'draft-js'
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



const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
// const { AlignmentTool } = alignmentPlugin;
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
class TextEditor extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
			editorState: EditorState.createEmpty(),
		  htmlState: ''
		};
		
	  this.focus = () => this.editor.focus();
	  this.onChange = (editorState) => {
		
		// const contentState = editorState;
		// let html = stateToHTML(contentState.getCurrentContent())
		this.setState({editorState})
		let options = {
			entityStyleFn: (entity) => {
			  const entityType = entity.get('type').toLowerCase();
			  if (entityType === 'image') {
				const data = entity.getData();
				return {
				  element: 'img',
				  attributes: {
					src: data.src,
					width: data.width*10
				  },
				  style: {

				  },
				};
			  }
			},
		  };
		  let html = stateToHTML(this.state.editorState.getCurrentContent(), options);
		  this.setState({htmlState:html})
			console.log(this.state.htmlState) 
		
	};
	
	  this.handleKeyCommand = this._handleKeyCommand.bind(this);
	  this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
	  this.toggleBlockType = this._toggleBlockType.bind(this);
	  this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
	 
	}

	_handleKeyCommand(command, editorState) {
	  const newState = RichUtils.handleKeyCommand(editorState, command);
	  if (newState) {
		this.onChange(newState);
	
		return true;
	  }
	  return false;
	}
	

	_mapKeyToEditorCommand(e) {
	  if (e.keyCode === 9 /* TAB */) {
		const newEditorState = RichUtils.onTab(
		  e,
		  this.state.editorState,
		  4, /* maxDepth */
		);
		if (newEditorState !== this.state.editorState) {
		  this.onChange(newEditorState);
		}
		return;
	  }
	  return getDefaultKeyBinding(e);
	}

	_toggleBlockType(blockType) {
	  this.onChange(
		RichUtils.toggleBlockType(
		  this.state.editorState,
		  blockType
		)
	  );
	}

	_toggleInlineStyle(inlineStyle) {
	  this.onChange(
		RichUtils.toggleInlineStyle(
		  this.state.editorState,
		  inlineStyle
		)
	  );
	}

	render() {
	  const {editorState} = this.state;
	  const {htmlState} = this.state;
	  console.log(htmlState)
	  // If the user changes block type before entering any text, we can
	  // either style the placeholder or hide it. Let's just hide it now.
	  let className = 'RichEditor-editor';
	  var contentState = editorState.getCurrentContent();
	  if (!contentState.hasText()) {
		if (contentState.getBlockMap().first().getType() !== 'unstyled') {
		  className += ' RichEditor-hidePlaceholder';
		}
	  }

	  return (
		<div className="RichEditor-root">
		  <BlockStyleControls
			editorState={editorState}
			onToggle={this.toggleBlockType}
		  />
		  <div style={{display:'flex'}}>
			   <InlineStyleControls
			editorState={editorState}
			onToggle={this.toggleInlineStyle}
		  /> <ImageAdd
				editorState={editorState}
				onChange={this.onChange}
				modifier={imagePlugin.addImage}
        />
		  </div>
		 
		  <div className={className} onClick={this.focus}>
			<Editor
			  blockStyleFn={getBlockStyle}
			  customStyleMap={styleMap}
			  editorState={editorState}
			  handleKeyCommand={this.handleKeyCommand}
			  keyBindingFn={this.mapKeyToEditorCommand}
			  onChange={this.onChange}
			  spellCheck={true}
			  plugins={plugins}
			  ref={(element) => {
				this.editor = element;
			  }}
			/>
			</div>
			 

			
		  
		</div>
	  );
	}
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
  };

  var INLINE_STYLES = [
	{label: 'Жирный', style: 'BOLD'},
	{label: 'Курсив', style: 'ITALIC'},
	{label: 'Подчеркнутый', style: 'UNDERLINE'},
	{label: 'Выделенный', style: 'CODE'},
  ];
 
  const InlineStyleControls = (props) => {
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
  };


   export default TextEditor