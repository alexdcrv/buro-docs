
import {GET_FOLDERS,GET_FILES_INSIDE,CREATE_FOLDER, CREATE_FILE, DELETE_FILE} from '../types'



const initialState = {
    files: [],
    folders: [],
    file: null,

}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
        case GET_FOLDERS:
            return {
                ...state,
                folders: payload.subdirs,
            }
        case CREATE_FOLDER:
                return {
                    ...state,
                    folders: payload.subdirs,
                }
        case CREATE_FILE:
            return {
                ...state,
                folders: payload.subdirs,
            }
        case DELETE_FILE:
            return {
                ...state,
                folders: payload.subdirs,
            }
        case GET_FILES_INSIDE:
            return {
                ...state,
                files: payload 

            }
       
        default: 
            return state;
    }

} 
