const Sidebar =()=>{
	const array =[
		'hiy', 'pizd', 'lox','chmo'
	]
	return(
		<div>
			{
				array.map((el,i)=>{
					return(
						<div style={{display:'flex',padding:"30px",alignItems:'center'}}>
							<img src='/openicon.png'/>
							<div key={i}>
								{el}
							</div>
						</div>
						
					)
				})
			}
		</div>
	)
}
export default Sidebar