import {useSelector} from 'react-redux'

const StaticContent =()=>{
	const htmlState = useSelector (state => state.state)
	return(
		<div dangerouslySetInnerHTML={{__html: htmlState}}>	
			</div>
	)
}
export default StaticContent