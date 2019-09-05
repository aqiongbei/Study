/**
 * [getPastSixMonth description]
 * @param  {[Number]} month [description]
 * @return {[Array]}       [description]
 */
function getPastSixMonth(month){
	var month = Number(month);
	var months = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
	var startIndex = month;
	if (month < 6) {
		startIndex = 12 + month;
	}
	return months.slice(startIndex - 6, startIndex );
}