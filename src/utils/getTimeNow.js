export function getTimeNow() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var date = currentDate.getDate();
    date = date < 10 ? '0' + date : date;
    var hours = currentDate.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = currentDate.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var seconds = currentDate.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var str = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    return str
}

