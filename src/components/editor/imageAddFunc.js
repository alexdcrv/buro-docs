import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {url} from '../../utils/axios'
import { imageUpload } from '../../redux/actions/dataOperations';
import styles from './styles.module.css';


const ImageAdd=(props)=> {

	const [buttonStatus, setButtonStatus] = useState('')
	const [link, setLink] = useState('')
	const [open, setOpen] = useState(false)
	const dispatch = useDispatch()
	const imgResponse = useSelector(state=>state.dataOperations.imgResponse)
	const onPopoverClick = () => {
		setOpen(!open)
	};
	useEffect(()=>{
		if(imgResponse.msg!=='') {
			setButtonStatus(true)
			setLink(url+'/'+imgResponse.filename)
		}
	},[imgResponse])

	const addImage = () => {
		const { editorState, onChange } = props;
		onChange(props.modifier(editorState, link));
		setOpen(false)
	};

	const changeUrl = (evt) => {
		let file =  evt.target.files[0]
		dispatch(imageUpload(file))
	};

		return (
		<div className={styles.addImage}>
			<div className={styles.button}
			onMouseUp={onPopoverClick}>
			Добавить изображение
			</div>
			<div className={styles.popover} style={{
				display:`${open?'block':'none'}`
			}} >
			<input
				type="file"
				className={styles.addImageInput}
				onChange={changeUrl}
			/>
			<button
				className={styles.addImageConfirmButton}
				type="button"
				style={{display:`${buttonStatus?'inline-block':'none'}`}}
				onClick={addImage}
			>
				Добавить
			</button>
			</div>
		</div>
		);
	}
export default ImageAdd