import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fileAdd, getStaticFile } from "../../redux/actions/dataOperations"
import style from './sidebar.module.css'
const OneFolder=({folderN,ind})=>{
	const dispatch = useDispatch()
	const [fileInput, setFileInput] = useState(false)
	const [fileNameInput, setFileNameInput] = useState('')
	const [selected,setSelected] = useState(false)
	const addFile =(dirname)=>{
		dispatch(fileAdd(fileNameInput,dirname))
		setFileNameInput('')
		setFileInput(false)
	}
	const getFile =(file, dirname)=>{
		dispatch(getStaticFile(file, dirname))
	}
	return(
		<>
			<div style={{display:`${ind===0?'none':'block'}`}} >
			<div className={style.folder}onClick={()=>{setSelected(!selected)}} >
				<img alt='open' src='/openicon.png'style={{width:'10px',transform: `rotate(${selected?'180deg':'90deg'})`}}/>
				
				<div style={{marginLeft:'5px'}}>
					{folderN.dirname}
				</div>
			</div>
			<div className={style.files}  style={{display:`${selected?'block':'none'}` }}>
				
					{folderN.files.map((file,i)=>{
						return(
							<li onClick={()=>getFile(file,folderN.dirname)} key={i}  style={{marginRight:'10px',padding:'7px'}}>
								{file}
							</li>
						)
					})
				}
			</div>
			<>
				<div style={{display:`${selected?'block':'none'}`}}>
					<div style={{display:`${fileInput?'none':'flex'}`, marginLeft:'30px'}} className={style.createFolder} onClick={()=>{setFileInput(true)}}>
						<img alt='соаздать' style={{width:'20px',marginRight:'9px'}} src='/plus.png'></img>
						<p>Создать файл</p>
					</div>
					<div style={{display:`${!fileInput?'none':'flex'}`, padding:'5px'}}>
					<input 
						style={{marginLeft:'50px'}}
						placeholder='Введите название файла'
						value={fileNameInput}
						onChange={(e)=>{setFileNameInput(e.target.value)}}
						onKeyPress={(e)=>e.key==='Enter'?addFile(folderN.dirname):''}/>
					</div>
					<p onClick={()=>addFile(folderN.dirname)} className={style.saveButton}
						style={{display:`${!fileInput?'none':'block'}`}}>Сохранить
					</p>
				</div>
			</>
			
		</div>

		</>
	)
}
export default OneFolder
