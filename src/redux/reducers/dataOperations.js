
import {SEND_IMAGE,EDIT_FILE,GET_ONE_FILE, SAVE_FILE} from '../types'



const initialState = {
	imgResponse:{
        msg:'',
        filename:''
    },
	fileResponse: '',
	file:'',
    htmlStatus: 0
}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
			case GET_ONE_FILE:
				return {
					...state,
					file: payload,
					htmlStatus: 1
				}
            case SEND_IMAGE:
                return {
                    ...state,
                    imgResponse: payload
                }
            case SAVE_FILE:
                return {
                    ...state,
                    htmlStatus: 1,
                    file: payload
                }  
            case EDIT_FILE:
                return {
                    ...state,

					htmlStatus:2
                }
			// case EDIT_FILE:
			// 	return {
			// 		...state,
			// 		file: payload,
			// 		htmlStatus: true
			// 	} 
            default: 
                return state;
    }

} 
