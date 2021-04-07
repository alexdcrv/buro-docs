import { innerBackend } from "../../utils/axios";
import { CREATE_FILE,SAVE_FILE, EDIT_FILE, GET_ONE_FILE, SEND_IMAGE } from "../types";



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
  
  export const getStaticFile = (file,dirname) => async dispatch  => {
  let body ={
	 filepath:`${dirname}/${file}` 
  }

  try {
	
	  const res = await innerBackend.put(`docs/read`, body) 
	  dispatch({
		  type: GET_ONE_FILE,
		  payload: res.data
		 
	  })
	  

	}
	catch (err) {
	  alert('ОШИБКА')
		  
	} 

}
  export const fileAdd = (fileNameInput,dirname) => async dispatch  => {
	let body ={
		dir: dirname,
		text: {
			folder:dirname,
			name:fileNameInput,
			html: '',
			editorState:''
		},
		filename: fileNameInput,
		
	}

	try {
	
		const res = await innerBackend.post(`docs/filepost`, body)
		dispatch({
			type: CREATE_FILE,
			payload: res.data
		})
	
  
	  }
	  catch (err) {
		alert('ОШИБКА')
			
	  } 
  
  }
  export const fileSave = (dirname,fileName,editorState,html) => async dispatch  => {

	let body ={
		dir: dirname,
		text: {
			folder: dirname,
			name:fileName,
			html: html,
			editorState: editorState
		},
		filename: fileName,
		
	}

	try {
	
		const res = await innerBackend.post(`docs/editfile`, body)
		dispatch({
			type: SAVE_FILE,
			payload: res.data
		})
	
  
	  }
	  catch (err) {
		alert('ОШИБКА')
			
	  } 
  
  }
  export const fileEdit = () => async dispatch  => {

		dispatch({
			type: EDIT_FILE,
		})
	
  }