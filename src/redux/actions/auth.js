import {LOGIN} from '../types'
import {innerBackend,  setAuthToken} from '../../components/utils/axios'

export const login = (formData) => async dispatch  => {
    try {
        const res = await innerBackend.post('/auth', formData)
        dispatch({
            type: LOGIN,
            payload: res.data
        })
                  setAuthToken(res.data.token);
                  dispatch(loadUser())
                 
                  
                  

        }
      catch (err) {
        const errors = err.response.data.errors;
        errors.map(err => {
          alert(err)
        })            
      
    }

}