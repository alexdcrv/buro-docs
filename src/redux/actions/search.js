import { PUSH_FILES_TO_SEARCH, PUSH_SECTIONS_TO_SEARCH } from "../types"

export const pushFileToSearch = (file, dirpath) => async dispatch  => {
	console.log('pushFilestep2',file, dirpath)
		dispatch({
			type: PUSH_FILES_TO_SEARCH,
			file: dirpath+'/'+file.slice(0,-5)
		})
	
  
}
export const pushSectionToSearch = (section) => async dispatch  => {

	dispatch({
		type: PUSH_SECTIONS_TO_SEARCH,
		section: section
	})


}
	 
  