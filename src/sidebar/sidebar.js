import { useEffect, useState } from "react"
import style from './sidebar.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { folderAdd } from "../redux/actions/fileSystem"
import { fileAdd } from "../redux/actions/dataOperations"
const Sidebar =()=>{
	const [input, setInput] = useState(false)
	const [fileInput, setFileInput] = useState(false)
	const [folder, setFolder] = useState('')
	const [fileNameInput, setFileNameInput] = useState('')
	const dispatch = useDispatch()
	const [folderInput, setFolderInput] = useState('')
	const foldersList = useSelector(state => state.fileSystem.folders)
	// const filesList = useSelector(state => state.fileSystem.files)
	useEffect(() => {
		console.log(foldersList)
	}, [foldersList])
	const addFolder =()=>{
		dispatch(folderAdd(folderInput))
		setFolderInput('')
		setInput(false)
	}
	const addFile =()=>{
		dispatch(fileAdd(fileNameInput))
		setFileNameInput('')
		setFileInput(false)
	}
	return(
		<div className={style.container} >
			
				{
					foldersList.map((el,i)=>{
						return(
							<div>
								<div onClick={()=>setFolder(i)} className={style.folder} >
									<img alt='open' src='/openicon.png'style={{width:'10px',transform: `rotate(${folder===i?'180deg':'90deg'})`}}/>
									<div key={i} style={{marginLeft:'5px'}}>
										{el.dirname}
									</div>
								</div>
								<div className={style.files} >
									{folder===i?
										el.files.map((el,i)=>{
											return(
												<div key={i} style={{marginRight:'10px'}}>
													{el}
												</div>
											)
										}):''
									}
								</div>
								{folder===i?
								<>
								<div style={{display:`${fileInput?'none':'flex'}`, marginLeft:'15px'}} className={style.createFolder} onClick={()=>{setFileInput(true)}}>
									<img alt='соаздать' style={{width:'20px',marginRight:'9px',marginTop:'5px'}} src='/plus.png'></img>
									<p>Создать файл</p>
								</div>
								<div style={{display:`${!fileInput?'none':'flex'}`, padding:'5px'}}>
									<input 
									style={{marginRight:'9px'}}
									placeholder='Введите название файла'
									value={folderInput}
									onChange={(e)=>{setFolderInput(e.target.value)}}
									onKeyPress={(e)=>e.key==='Enter'?addFile:''}/>
								</div>
								<p 	onClick={addFile}
									style={{display:`${!fileInput?'none':'block'}`,marginLeft:'10px',marginTop:'-2px',fontSize:'14px',textAlign:'right', cursor:'pointer'}}>Сохранить
								</p>
								</>
								:''}
							</div>
						)
					})
				}
				<div style={{display:`${input?'none':'flex'}`}} className={style.createFolder} onClick={()=>{setInput(true)}}>
					<img alt='соаздать' style={{width:'20px',marginRight:'9px',marginTop:'5px'}} src='/plus.png'></img>
					<p>Создать папку</p>
				</div>
				<div style={{display:`${!input?'none':'flex'}`, padding:'5px'}}>
					<input 
					style={{marginRight:'9px', width:'80%'}}
					placeholder='Введите название папки'
					value={fileNameInput}
					onChange={(e)=>{setFileNameInput(e.target.value)}}
					onKeyPress={(e)=>e.key==='Enter'?addFolder:''}/>
				</div>
				<p 	onClick={addFolder}
					style={{display:`${!input?'none':'block'}`,marginLeft:'10px',marginTop:'-2px',fontSize:'14px',textAlign:'right', cursor:'pointer'}}>Сохранить
				</p>
			
		</div>
		
	)
}
export default Sidebar