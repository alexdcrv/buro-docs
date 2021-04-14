
import './App.css';
import {useDispatch, useSelector} from 'react-redux'
import TextEditor from './components/editor/editor';
import Sidebar from './components/sidebar/sidebar';
import StaticContent from './components/static/static';
import { useEffect, useState } from 'react';
import { setAuthToken } from './utils/axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from './components/auth/login';
import { loadPermission } from './redux/actions/auth';
import Start from './components/static/start';
// import { useEffect } from 'react';

function App() {
  const history = createBrowserHistory();
  const dispatch = useDispatch()
  const permission = useSelector(state => state.auth.permission)
  const token = useSelector(state => state.auth.token)
  const [auth,setAuth]=useState()
    window.addEventListener('message', event => { 
      if (event.origin.startsWith(process.env.REACT_APP_IP_PLATFORM)) { 
        
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
    <Router history={history}>
    {!auth||!permission ? (
      <>

        <Route exact path="/" component={Login} />
        <Route
                exact
                path="/public/:path+"
                component={StaticContent}
              />

      </>
    ) : (
    <div className="App">
      
        <div>
           <Sidebar history={history} permission={permission}/>
      
          <Switch>
            <Route exact path="/" component={Start}/>
            <Route exact path="/:path+" component={StaticContent}/>

          </Switch>
        </div>
         
          
          
          
        
     
      </div>)} 
    </Router>
    </>
  );
}

export default App;
