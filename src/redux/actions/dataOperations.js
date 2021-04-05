import { innerBackend } from "../../utils/axios";
import { SEND_IMAGE } from "../types";



export const imageUpload = (file) => async dispatch  => {


	try {
	
	const form = new FormData()
	if(file){
		form.append(
			'file',
			file
		  )
	}
		// console.log(form.get('file'), 'file HERE')
	 
		const res = await innerBackend.post(`docs/imageupload`, form)
		dispatch({
			type: SEND_IMAGE,
			payload: res.data
		})
	
  
	  }
	  catch (err) {
		alert('ОШИБКА')
			
	  } 
  
  }
  