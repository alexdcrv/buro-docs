import {AUTH_ERROR,LOAD_PERMISSION,LOGIN} from '../types'



const initialState = {
    user: null,
    isAuthenticated: false,
    token: false,
    loaded: false,
	permission:null
}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
        case LOGIN:
             localStorage.setItem('token', payload.token);
            //  console.log(localStorage.token, 'NEW TOKEN ')
            return {
                ...state,
                loaded: true,
                token: true,
            }
		case AUTH_ERROR:
                // console.log('here is payload',payload) 
			return {
				...state,
				isAuthenticated: false,
				error: payload.err
			}
		case LOAD_PERMISSION:
			return {
				...state,
				permission: payload.permission
			}
		default: 
			return state;
		}
	}