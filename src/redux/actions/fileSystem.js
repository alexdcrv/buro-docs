

import { innerBackend } from "../../utils/axios";
import { CREATE_FOLDER, GET_FOLDERS } from "../types";



export const folderAdd = (folderInput) => async dispatch  => {
	let body ={
		dirname: folderInput
	}

	try {
	
		const res = await innerBackend.put(`docs/mkdir`, body)
		dispatch({
			type: CREATE_FOLDER,
			payload: res.data
		})
	
  
	  }
	  catch (err) {
		alert('ОШИБКА')
			
	  } 
  
  }
  export const getFolders = () => async dispatch  => {

	try {
	
		const res = await innerBackend.get('docs/recurse')
		dispatch({
			type: GET_FOLDERS,
			payload: res.data
		})
	
  
	  }
	  catch (err) {
		alert(err)
			
	  } 
  
  }