import { useEffect, useState } from "react"
import style from './sidebar.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { folderAdd, getFolders } from "../../redux/actions/fileSystem"

import OneFolder from "./oneFolder"
import { getStaticFileSearch } from "../../redux/actions/dataOperations"

// import { fileDetete, folderDetete } from "../../redux/actions/dataOperations"
const Sidebar =({permission, history})=>{
	const [input, setInput] = useState(false)
	const [inputSearch, setInputSearch] = useState('')
	const [inputDir, setInputDir] = useState('')
	const allFiles = useSelector(state => state.search.files)
	const allSections = useSelector(state => state.search.sections)
	const dispatch = useDispatch()
	const [folderInput, setFolderInput] = useState('')
	const [searchFiles,setSearchFiles] = useState('')
	const [searchRes,setSearchRes] = useState([])
	const [searchDir,setSearchDir] = useState([])
	const [searchSections,setSearchSections] = useState('')
	const foldersList = useSelector(state => state.fileSystem.folders)
	// const filesList = useSelector(state => state.fileSystem.files)
	useEffect(() => {
		
		dispatch(getFolders())	
	}, [])


	const regexEscape =(str)=> {
		return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
	}

	const regSearch =(array, string)=> {
		setInputSearch(string)
		let responce = []
		let regex = new RegExp (string, "g")
		for(let el of array) {
			if(el.match(regex)){responce.push(el)}
		}
		return setSearchRes(responce)
	}
	const regDirSearch =(array, string)=> {
		setInputDir(string)
		let responce = []
		let regex = new RegExp (string, "g")
		for(let el of array) {
			if(el.dirname.match(regex)){responce.push(el)}
		}
		return setSearchDir(responce)
	}
	const nameOnly =(name)=> {
		let replacement = name.substr(name.lastIndexOf('/') + 1);
		return replacement
	}
	useEffect(()=>{
		setSearchRes(searchFiles)	 
	},[searchFiles])
	useEffect(()=>{
		setTimeout(()=>{
		if(typeof allFiles !== 'number'){
			
			setSearchFiles(allFiles)
		}},100)
		
		
	},[allFiles])
	useEffect(()=>{
		if(typeof allSections !== 'number'){
			setSearchSections(allSections)
		}
		
		
		
	},[allSections])
	const addFolderSave =(e)=>{
			dispatch(folderAdd(folderInput))
			setFolderInput('')
			setInput(false)
	
	}
	const addFolder =(e)=>{
		if(e.key=='Enter'){
			dispatch(folderAdd(folderInput))
			setFolderInput('')
			setInput(false)
		}
	
	}

	const getFile =(file)=>{
		dispatch(getStaticFileSearch(file.slice(6)))
	}
	return(
		<div className={style.container} >
			<div className={style.containerName}>Документация БЮРО82</div>
			<div style={{marginTop:'20px'}}>
				<input className={style.searchInput}
				placeholder="Поиск файлов"
				 onChange={(e)=>{
					regSearch(searchFiles, regexEscape(e.target.value))
				}}/>
				{searchRes && searchRes.map((el,i)=>{
					if (inputSearch.length>=2)
					return (
						<div className={style.resSearch} onClick={()=>getFile(el)} key={i}>{nameOnly(el)}</div>
					)
				})}
			</div>
			<div style={{marginTop:'10px',marginBottom:'20px'}}>
				<input className={style.searchInput}
					placeholder="Поиск разделов"
				 	onChange={(e)=>{regDirSearch(searchSections, regexEscape(e.target.value))}}/>
				{searchDir && searchDir.map((el,i)=>{
					if (inputDir.length>=2)
					return (
						<OneFolder 
							search={true}
							permission={permission} 
							folderN={el}
							ind={i} key={i}/>
					)
				})}
			</div>
			{foldersList.map((folderN,i)=>{
				return(
					<OneFolder 
						history={history}
						search={false}
						permission={permission} 
						folderN={folderN}
						ind={i} key={i}/>
				)
			})
			}
			<div style={{display:`${input||permission==='user'?'none':'flex'}`, marginLeft:'20px'}} className={style.createFolder} onClick={()=>{setInput(true)}}>
				<img alt='соаздать' style={{width:'13px',marginRight:'9px',marginTop:'5px'}} src='/plus.png'></img>
				<p>Создать папку</p>
			</div>
			<div style={{display:`${!input?'none':'flex'}`, padding:'5px'}}>
			<input 
				style={{marginLeft:'50px'}}
				placeholder='Введите название папки'
				value={folderInput}
				onChange={(e)=>{setFolderInput(e.target.value)}}
				onKeyPress={(e)=>addFolder(e)}/>
			</div>
			<div onClick={addFolderSave} className={style.saveButton}
				style={{display:`${!input?'none':'block'}`}}>Сохранить
			</div>
			
		</div>
		
	)
}
export default Sidebar