import { useEffect, useState } from "react"
import style from './sidebar.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { folderAdd, getFolders } from "../redux/actions/fileSystem"
import { fileAdd, getStaticFile } from "../redux/actions/dataOperations"
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
	useEffect(() => {
		dispatch(getFolders())	
	}, [])
	const addFolder =()=>{
		dispatch(folderAdd(folderInput))
		setFolderInput('')
		setInput(false)
	}

	const addFile =(dirname)=>{
		dispatch(fileAdd(fileNameInput,dirname))
		setFileNameInput('')
		setFileInput(false)
	}
	const getFile =(file, dirname)=>{
		dispatch(getStaticFile(file, dirname))
	}
	
	return(
		<div className={style.container} >
			
				{
					foldersList.map((folderN,i)=>{
						return(
							<div key={i}style={{display:`${i===0?'none':'block'}`}}>
								<div onClick={()=>setFolder(i)} className={style.folder} >
									<img alt='open' src='/openicon.png'style={{width:'10px',transform: `rotate(${folder===i?'180deg':'90deg'})`}}/>
									<div key={i} style={{marginLeft:'5px'}}>
										{folderN.dirname}
									</div>
								</div>
								<div className={style.files} >
									{folder===i?
										folderN.files.map((file,i)=>{
											return(
												<div onClick={()=>getFile(file,folderN.dirname)} key={i} style={{marginRight:'10px'}}>
													{file}
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
									style={{marginLeft:'23px'}}
									placeholder='Введите название файла'
									value={fileNameInput}
									onChange={(e)=>{setFileNameInput(e.target.value)}}
									onKeyPress={(e)=>e.key==='Enter'?addFile(folderN.dirname):''}/>
								</div>
								<p 	onClick={()=>addFile(folderN.dirname)}
									style={{display:`${!fileInput?'none':'block'}`,marginTop:'-2px',fontSize:'12px',textAlign:'right', cursor:'pointer'}}>Сохранить
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
					style={{marginRight:'9px'}}
					placeholder='Введите название папки'
					value={folderInput}
					onChange={(e)=>{setFolderInput(e.target.value)}}
					onKeyPress={(e)=>e.key==='Enter'?addFolder:''}/>
				</div>
				<p onClick={addFolder}
					style={{display:`${!input?'none':'block'}`,marginTop:'-2px',fontSize:'12px',textAlign:'right', cursor:'pointer'}}>Сохранить
				</p>
			
		</div>
		
	)
}
export default Sidebar