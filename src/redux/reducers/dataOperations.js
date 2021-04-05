
import {SEND_IMAGE,EDIT_FILE,GET_ONE_FILE,CREATE_FILE} from '../types'



const initialState = {
	imgResponse:{
        msg:'',
        filename:''
    },
	fileResponse: '',
	file:null,
    htmlStatus: true
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
					htmlStatus: false
				}
            case SEND_IMAGE:
                return {
                    ...state,
                    imgResponse: payload
                }
            case CREATE_FILE:
                return {
                    ...state,
					file: payload
                }
            case EDIT_FILE:
                return {
                    ...state,
                    file: payload,
					htmlStatus: true
                }
			case EDIT_FILE:
				return {
					...state,
					file: payload,
					htmlStatus: true
				} 
            default: 
                return state;
    }

} 
