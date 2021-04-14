import {LOGIN,LOAD_PERMISSION} from '../types'
import {innerBackend,  setAuthToken} from '../../utils/axios'

export const login = (formData) => async dispatch  => {
    try {
        const res = await innerBackend.post('/auth', formData)
        dispatch({
            type: LOGIN,
            payload: res.data
        })
                  setAuthToken(res.data.token);
                  dispatch(loadPermission())
                 
                  
                  

        }
      catch (err) {
        
          alert(err)
              
      
    }

}
export const loadPermission =()=> async dispatch =>{
	try {
        const res = await innerBackend.get('users/permission/mne/zapili')
        dispatch({
            type: LOAD_PERMISSION,
            payload: res.data
        })    
        }
	catch (err) {
		
			alert(err)
	   

}}
