
import './App.css';
import {useDispatch, useSelector} from 'react-redux'
import TextEditor from './components/editor/editor';
import Sidebar from './components/sidebar/sidebar';
import StaticContent from './components/static/static';
import { useEffect, useState } from 'react';
import { setAuthToken } from './utils/axios';

import Login from './components/auth/login';
import { loadPermission } from './redux/actions/auth';
// import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()
  const permission = useSelector(state => state.auth.permission)
  const token = useSelector(state => state.auth.token)
  const htmlStatus = useSelector(state => state.dataOperations.htmlStatus)
  const [auth,setAuth]=useState()
    window.addEventListener('message', event => { 
      if (event.origin.startsWith('http://192.168.0.29:3001')) { 
        
        setAuthToken(event.data)
        setAuth(true)
        setTimeout(()=>{
          dispatch(loadPermission())
        },100)
      } 
  }); 
  useEffect(() => {
    if(token) {
      setTimeout(()=>{
        dispatch(loadPermission())
      },100)
      if(localStorage.token){
        // console.log('login')
        setAuth(true)
      }
    }
    


  },[token])

  useEffect(() => {
    setAuthToken(localStorage.token)
    if (localStorage.token!==undefined) {
        setAuth(true)
        setTimeout(()=>{
          dispatch(loadPermission())
        },100)
        
    }
  },[localStorage.token])
  return (
    <>
    {!auth||!permission ? (
      <Login/>
    ) : (
    <div className="App">
      <Sidebar permission={permission}/>
      {
        htmlStatus===2?<TextEditor />:htmlStatus===1?<StaticContent permission={permission}/>:<div className="File">Выберите файл для просмотра или редактирования</div>
      }

    </div>)}
    </>
  );
}

export default App;
