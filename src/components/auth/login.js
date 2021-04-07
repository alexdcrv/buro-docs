import styles from './login.module.css'
import  {useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth';
// import Login from './Login copy';

const Login = () => {
    const dispatch = useDispatch();

    const [formData, setFormData ] = useState({
        
        email: '',
        password: ''

      
      });
      

      const { password, email} = formData;

  
    const onChange = e => {
        e.preventDefault(); 

        setFormData({ ...formData, [e.target.name]: e.target.value });
     }
     


     const onSubmit = async e => {
        e.preventDefault();
        // console.log(formData)
        dispatch(login(formData))
    
            // register({ name, email, password});
    
           
        }

    return (
     
            
            <form className={styles.loginForm} onSubmit={onSubmit}>
            <p size='24' className={styles.title}>Логин</p>
                <input 
                    className={styles.email}
                    type='email'
                    placeholder='email'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}/>

                <input
                    className={styles.password}
                    type='password'
                    placeholder='password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}/>

            <button color='white' bgColor='#3F496C' className={styles.button} type="submit"> Логин</button>

            </form>
     
    )
}


export default Login