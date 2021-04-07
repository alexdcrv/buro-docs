
import './App.css';
import {useSelector} from 'react-redux'
import TextEditor from './components/editor/editor';
import Sidebar from './components/sidebar/sidebar';
import StaticContent from './components/static/static';
// import { useEffect } from 'react';

function App() {
  const htmlStatus = useSelector(state => state.dataOperations.htmlStatus)
  
  return (
    <div className="App">
      <Sidebar/>
      {
        htmlStatus===2?<TextEditor/>:htmlStatus===1?<StaticContent/>:<div className="File">Выберите файл для просмотра или редактирования</div>
      }

    </div>
  );
}

export default App;
