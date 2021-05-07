import { useDispatch, useSelector } from 'react-redux'
import style from './sidebar.module.css'

import { fileDetete, folderDetete, selectDelete } from '../../redux/actions/dataOperations'

const Confirm =()=>{
    const dispatch = useDispatch()
    
    const info = useSelector(state=>state.dataOperations.info)
    const cancel =()=>{
		let info = null
		dispatch(selectDelete(info))
	}
    const nameOnly =(name)=> {
		let replacement = name.substr(name.lastIndexOf('/') + 1);
		return replacement
	}
    const delFileClick =()=>{
		dispatch(fileDetete(info.file, info.dirname.slice(6)))

		dispatch(selectDelete(null))
	}
    const delFolderClick =()=>{
		dispatch (folderDetete(info.dirname.slice(6)))
        dispatch(selectDelete(null))
    }

    return (
        <div className={style.confirm_back}>    
            <div className={style.confirm_window}>
            Вы действительно хотите удалить {info.file ? 'файл' : 'папку'} {info.file!==null ? info.file.slice(0,-5) : nameOnly(info.dirname) }
            <div style={{display:'flex',justifyContent:'space-between', width:'90%', marginLeft:'5%', marginTop:'35px'}}>
                <button onClick={cancel}>Отмена</button>
                <button onClick={()=>
                    info.file ? delFileClick() : delFolderClick()
                }>Удалить</button>
            </div>
            
            </div>
            
        </div>
    )

}
export default Confirm