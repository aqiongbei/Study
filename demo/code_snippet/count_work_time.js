var tr_list = $$('.pq-cont-right tr');
var result = {
    list: [],
    total: 0,
    max_work_time: 0,
    min_work_time: 0,
};

for (var tr of tr_list) {
    let date = {
        start: '',
        end: '',
        work_time: '',
    }
    let td_list = tr.querySelectorAll('td');
    date.start = td_list[5].innerText;
    date.end = td_list[6].innerText;

    if (date.start && date.end) {
        let work_time = new Date(date.end) - new Date(date.start);
        date.work_time = Number((work_time / (3600 * 1000)).toFixed(1));
        td_list[8].innerText = `${date.work_time}h`;
        result.list.push(date);
        result.total += date.work_time;
        if (date.work_time > result.max_work_time) {
            result.max_work_time = date.work_time;
        }
        if (result.min_work_time == 0 || date.work_time < result.min_work_time) {
            result.min_work_time = date.work_time;
        }
    }
}

result.total = Number(result.total.toFixed(1))
console.log(result)
console.log('=================');
var temp = result.total - result.list.length * 9;
console.info('当前总工作时长:', result.total, '正常工作总时长:', result.list.length * 9, '超出工作时长', temp);
temp = ((result.total/result.list.length).toFixed(1) - 9).toFixed(1);
console.log('平均每天工作时长:', (result.total/result.list.length).toFixed(1), '正常每天工作时长:', 9, '平均每天工作超出时长:', temp);
console.log('当天最长工作时长:', result.max_work_time, '当天最短工作时长:', result.min_work_time)
