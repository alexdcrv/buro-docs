import {DELETE_FILE, PUSH_FILES_TO_SEARCH,PUSH_SECTIONS_TO_SEARCH} from '../types'



const initialState = {
    files: [],
    sections: [],
}
export default function(state = initialState, action) {
    const {
        type, file, section
    } = action;

    switch(type){
		case DELETE_FILE:
			console.log('clearall', initialState.files)
			return {
				
				files:[],
				sections:[],
			}
        case PUSH_FILES_TO_SEARCH :
			console.log('pushFilestep3',initialState.files)
            return {
                ...state,
                files: initialState.files.push(file),
            } 
        case PUSH_SECTIONS_TO_SEARCH:
		
                return {
                    ...state,
					sections: initialState.sections.push(section),
                }
		
        default: 
            return state;
    }

} 
