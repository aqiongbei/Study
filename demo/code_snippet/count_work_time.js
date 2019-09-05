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
console.info('��ǰ�ܹ���ʱ��:', result.total, '����������ʱ��:', result.list.length * 9, '��������ʱ��', temp);
temp = ((result.total/result.list.length).toFixed(1) - 9).toFixed(1);
console.log('ƽ��ÿ�칤��ʱ��:', (result.total/result.list.length).toFixed(1), '����ÿ�칤��ʱ��:', 9, 'ƽ��ÿ�칤������ʱ��:', temp);
console.log('���������ʱ��:', result.max_work_time, '������̹���ʱ��:', result.min_work_time)
