import { useState } from "react"
import style from './sidebar.module.css'
import {useSelector} from 'react-redux'
const Sidebar =()=>{
	const [folder, setFolder] = useState('')
	const foldersList = useSelector(state => state.fileSystem.folders)
	const filesList = useSelector(state => state.fileSystem.files)
	const array =[
		'Архитектура', 'Конструкции', 'BIM стандарты','ХЗ'
	]
	const array2 =[
		'123', '456', '789','1111'
	]
	return(
		<div className={style.container} >
			<div >
				{
					array.map((el,i)=>{
						return(
							<div>
								<div onClick={()=>setFolder(i)} className={style.folder} >
									<img alt='open' src='/openicon.png'style={{width:'10px',transform: `rotate(${folder===i?'180deg':'90deg'})`}}/>
									<div key={i} style={{marginLeft:'5px'}}>
										{el}
									</div>
								</div>
								<div className={style.files} >
									{folder===i?
										array2.map((el,i)=>{
											return(
												<div key={i} style={{padding:'10px'}}>
													{el}
												</div>
											)
										}):''
									}
								</div>
								
							</div>
						)
					})
				}
			</div>
		</div>
		
	)
}
export default Sidebar