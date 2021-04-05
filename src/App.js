
import './App.css';
import {useSelector} from 'react-redux'
import TextEditor from './editor/editor';
import Sidebar from './sidebar/sidebar';
import StaticContent from './static/static';
// import { useEffect } from 'react';

function App() {
  const htmlStatus = useSelector(state => state.dataOperations.htmlStatus)
  
  return (
    <div className="App">
      <Sidebar/>
      {
        htmlStatus?<TextEditor/>:!htmlStatus?<StaticContent/>:<div className="File">Выберите файл для просмотра или редактирования</div>
      }

    </div>
  );
}

export default App;
