/**
 * ����ȥ�أ������ڰ������������
 * @param  {[Array]} arr [description]
 * @return {[Array]}     [description]
 */
function unique (arr) {
	var result = [];
	var len = arr.length;
	while (len > 0) {
		var currentItem = arr.pop();
		result.push(currentItem);
		arr = arr.filter(function (item, index) {
			if (typeof currentItem === 'object') {
				return (JSON.stringify(currentItem) !== JSON.stringify(item));
			} else {
				return (currentItem !== item);
			}
		})
		len = arr.length; 
	}
	return result;
}