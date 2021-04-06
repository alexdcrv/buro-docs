import {useDispatch, useSelector} from 'react-redux'
import { fileEdit } from '../redux/actions/dataOperations'
import styles from './static.module.css'
const StaticContent =()=>{
	const dispatch = useDispatch()
	const file = useSelector (state => state.dataOperations.file)
	const editFile =()=>{
		dispatch(fileEdit())
	}
	return(
		<div className={styles.container}>
			<div className={styles.edit} onClick={editFile}><img className={styles.img} src='/edit1.jpg'></img>Редактировать</div>
			{file!==''?<div dangerouslySetInnerHTML={{__html: file.html}}></div>:''}
			
			
		</div>
		
	)
}
export default StaticContent