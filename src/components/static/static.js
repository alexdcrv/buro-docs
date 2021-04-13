import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { fileEdit, getStaticFile } from '../../redux/actions/dataOperations'
import styles from './static.module.css'
const StaticContent =({match})=>{
	let {path} = match.params;
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
		{
			file && <div className={styles.container}>
				<div className={styles.edit} style={{display:`${permission==='user'?'none':'block'}`}} onClick={editFile}><img alt='/' className={styles.img} src='/edit1.jpg'></img>Редактировать</div>
				{file.html!==''?
				<div>
					<h1 style={{fontSize:'48px'}}>{file.name}</h1>
					<div dangerouslySetInnerHTML={{__html: file.html}}></div>
				</div>
					
						:<div style={{fontFamily:'SuisseIntlLight'}}>Файл {file.name} создан. Нажмите кнопку "редактировать" для изменения.</div>
				}
				
				
			</div>
		}
			
		</>
		
		
	)
}
export default StaticContent