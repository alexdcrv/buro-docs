

import { innerBackend } from "../../utils/axios";
import { CREATE_FOLDER } from "../types";



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
  