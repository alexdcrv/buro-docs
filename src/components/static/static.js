import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { fileEdit, getStaticFile } from '../../redux/actions/dataOperations'

import TextEditor from '../editor/editor';
import styles from './static.module.css'
const StaticContent =({match,history})=>{
	let {path} = match.params;
	let url = window.origin;
	let fullpath = window.location.pathname
	const htmlStatus = useSelector(state => state.dataOperations.htmlStatus)
	const permission = useSelector(state => state.auth.permission)
	const dispatch = useDispatch()
	const file = useSelector (state => state.dataOperations.file)
	const editFile =()=>{
		dispatch(fileEdit())
	}

	useEffect(()=>{
		dispatch(getStaticFile(path))
		
	},[])

	return(
		<>
		{htmlStatus==1?
			 <div className={styles.container}>
			
				<div>
					<div className={styles.edit} style={{display:`${permission==="admin"?'block':'none'}`}} onClick={editFile}><img alt='/' className={styles.img} src='/edit1.jpg'></img>Редактировать</div>
					<div className={styles.public} style={{display:`${permission==="admin"?'block':'none'}`}} >Ссылка для публичного доступа: {url}{fullpath.includes('/public')?'/':'/public/'}{path}</div>
					{file.html!==''?
					<div>
						<h1 style={{fontSize:'48px'}}>{file.name}</h1>
						<div dangerouslySetInnerHTML={{__html: file.html}}></div>
					</div>
						
							:<div style={{fontFamily:'SuisseIntlLight'}}>Файл {file.name} создан. Нажмите кнопку "редактировать" для изменения. </div>
					}
				</div>
				
			
				
				
			</div>:htmlStatus==2?<TextEditor></TextEditor>:    <div className="File">Выберите файл для просмотра или редактирования</div>
			}
			
		</>
		
		
	)
}
export default StaticContent