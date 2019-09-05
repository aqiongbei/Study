/**
 * parse queryString
 * @param  {[String]} url [description]
 * @return {[Object]}     [description]
 */
function parseURL(url) {
	let  urlObj = {};
	let reg = /([^?=&]+)=([^?=&]+)/g;
	url.replace(reg, ($0, $1, $2) => {
		$2 = decodeURI($2);
		if (!isNaN($2)) $2 = Number($2);
		if (!urlObj[$1]) {
			urlObj[$1] = $2;
		} else {
			if (urlObj[$1] instanceof Array) {
				urlObj[$1].push($2);
			} else {
				urlObj[$1] = [urlObj[$1], $2]
			}
		}
	})
	return urlObj;
}