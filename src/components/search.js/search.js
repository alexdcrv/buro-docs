const regSearch =(array, string)=> {
	let responce = []
	let regex = new RegExp (string, "g")
	for(let el of array) {
		if(el.match(regex)){responce.push(el)}
	}
	return console.log(responce)
}
export default regSearch