import { useEffect, useState } from "react"
import style from './sidebar.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { folderAdd, getFolders } from "../../redux/actions/fileSystem"

import OneFolder from "./oneFolder"
import { fileDetete, folderDetete } from "../../redux/actions/dataOperations"
const Sidebar =(permission)=>{
	const [input, setInput] = useState(false)
	const dispatch = useDispatch()
	const [folderInput, setFolderInput] = useState('')
	
	const foldersList = useSelector(state => state.fileSystem.folders)
	// const filesList = useSelector(state => state.fileSystem.files)
	useEffect(() => {
		
		dispatch(getFolders())	
	}, [])

	const addFolder =()=>{
		dispatch(folderAdd(folderInput))
		setFolderInput('')
		setInput(false)
	}

	
	return(
		<div className={style.container} >
			{foldersList.map((folderN,i)=>{
				return(
					<OneFolder 
						permission={permission} 
						folderN={folderN}
						ind={i} key={i}/>
				)
			})
			}
			<div style={{display:`${input||permission==='user'?'none':'flex'}`, marginLeft:'5px'}} className={style.createFolder} onClick={()=>{setInput(true)}}>
				<img alt='соаздать' style={{width:'20px',marginRight:'9px',marginTop:'5px'}} src='/plus.png'></img>
				<p>Создать папку</p>
			</div>
			<div style={{display:`${!input?'none':'flex'}`, padding:'5px'}}>
			<input 
				style={{marginLeft:'50px'}}
				placeholder='Введите название папки'
				value={folderInput}
				onChange={(e)=>{setFolderInput(e.target.value)}}
				onKeyPress={(e)=>e.key==='Enter'?addFolder:''}/>
			</div>
			<div onClick={addFolder} className={style.saveButton}
				style={{display:`${!input?'none':'block'}`}}>Сохранить
			</div>
		</div>
		
	)
}
export default Sidebar