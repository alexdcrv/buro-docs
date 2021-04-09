import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import RecFolder from './oneFolder'
import { fileAdd, fileDetete, folderDetete, getStaticFile } from "../../redux/actions/dataOperations"
import { folderAdd } from "../../redux/actions/fileSystem"
import style from './sidebar.module.css'
import { pushFileToSearch,pushSectionToSearch } from "../../redux/actions/search"
const OneFolder=({folderN,permission,search})=>{
	const dispatch = useDispatch()
	const selectedFile = useSelector(state => state.dataOperations.file)

	const [fileInput, setFileInput] = useState(false)
	const [folderInput, setFolderInput] = useState('')
	const [fileNameInput, setFileNameInput] = useState('')
	const [selected,setSelected] = useState(false)
	const [selectedDir,setSelectedDir] = useState('')

	useEffect(()=>{
	setTimeout(()=>{
		folderN.files.map((file) => {
					console.log('pushFile')
					dispatch(pushFileToSearch(file,folderN.dirpath))
					
				})
	},1000)
		

	

		folderN.subdirs.map( section => {
			console.log('pushSect')
			dispatch(pushSectionToSearch(section))
		})	

	},[folderN])
	const addFile =(dirname)=>{
		dispatch(fileAdd(fileNameInput,dirname.slice(6)))
		setFileNameInput('')
		setFileInput(false)
	}
	
	const addFolder =(dirname)=>{
		let folderIn = dirname.slice(6)+'/'+folderInput
		dispatch(folderAdd(folderIn))
		setFolderInput('')
		setSelectedDir(false)
	}

	const delFile =(e, file, dirname)=>{
		if(e.code == "Delete") {
			dispatch(fileDetete(file, dirname.slice(6)))
		}
	}

	const delFolder =(dirpath)=>{
		dispatch(folderDetete(dirpath.slice(6)))
	}

	const getFile =(file, dirname)=>{
		dispatch(getStaticFile(file, dirname.slice(6)))
	}

	return(
		<>
			<div>
				<div className={style.folder}onClick={()=>{setSelected(!selected)}} >
					<img alt='open'  src='/openicon.png'style={{width:'10px',transform: `rotate(${selected?'180deg':'90deg'})`}}/>
					<div style={{marginLeft:'5px'}}>
						{folderN.dirname}
					</div>
					<img alt='del' src='/delete.jpg' onClick={()=>delFolder(folderN.dirpath)} style={{width:'20px',marginLeft:'30px',display: `${!selected||permission==='user'||search?'none':'flex'}`}}/>
				</div>
				<div className={style.files} style={{display:`${selected?'block':'none'}` }}>
					{folderN.subdirs && folderN.subdirs.map((subdir,i)=>{
						return(<RecFolder permission={permission} folderN={subdir} search={search} ind={i} key={i}/>)
						})
					}
				</div>
				<div className={style.files} style={{display:`${selected?'block':'none'}` }}>
					{folderN.files && folderN.files.map((file,i)=>{
						
						return(
						
							<li onClick={()=>getFile(file,folderN.dirpath)} tabIndex='0' onKeyUp={(e)=>delFile(e,file,folderN.dirpath)} key={i}  style={{
									backgroundColor:`${selectedFile.name===file.slice(0, -5)?'rgba(0,0,0, 0.1)':'white'}`,
									marginRight:'10px',
									padding:'7px',
									marginLeft:'3px',
									outline:'none'
								}}>
								{file.slice(0, -5)}
							</li>
						)
					})
					}
				</div>
				<>
					<div style={{display:`${!selected||permission==='user'||search?'none':'block'}`}}>
						<div style={{display:`${selectedDir?'none':'flex'}`, marginLeft:'16px'}} className={style.createFolder} onClick={()=>{setSelectedDir(true)}}>
							<img alt='соаздать' style={{width:'20px',marginRight:'9px'}} src='/plus.png'></img>
							<p>Добавить раздел</p>
						</div>
						<div style={{display:`${!selectedDir?'none':'flex'}`, padding:'0px'}}>
						<input 
							style={{marginLeft:'20px'}}
							placeholder='Введите название раздела'
							value={folderInput}
							onChange={(e)=>{setFolderInput(e.target.value)}}
							onKeyPress={(e)=>e.key==='Enter'?addFolder(folderN.dirname):''}/>
						</div>
						<p onClick={()=>addFolder(folderN.dirpath)} className={style.saveButton}
							style={{display:`${!selectedDir?'none':'block'}`}}>Сохранить
						</p>
					</div>

					
					<div style={{display:`${!selected||permission==='user'||search?'none':'block'}`}}>
						<div style={{display:`${fileInput?'none':'flex'}`, marginLeft:'16px'}} className={style.createFolder} onClick={()=>{setFileInput(true)}}>
							<img alt='соаздать' style={{width:'20px',marginRight:'9px'}} src='/plus.png'></img>
							<p>Создать файл</p>
						</div>
						<div style={{display:`${!fileInput?'none':'flex'}`, padding:'5px'}}>
						<input 
							style={{marginLeft:'5px'}}
							placeholder='Введите название файла'
							value={fileNameInput}
							onChange={(e)=>{setFileNameInput(e.target.value)}}
							onKeyPress={(e)=>e.key==='Enter'?addFile(folderN.dirname):''}/>
						</div>
						<p onClick={()=>addFile(folderN.dirpath)} className={style.saveButton}
							style={{display:`${!fileInput?'none':'block'}`}}>Сохранить
						</p>
					</div>
					
				</>
				
			</div>

		</>
	)
}
export default OneFolder
