/**
 * [coverToArray description]
 * @param  {[Object]} likeArr [description]
 * @return {[Array]}         [description]
 */
function coverToArray(likeArr) {
	let result = [];
	try{
		result = Array.prototype.slice.call(likeArr);
	} catch (err){
		for (let key in likeArr) {
			result.push(likeArr[key]);
		}
	}
	return result;
}