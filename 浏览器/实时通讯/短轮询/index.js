var xhr = new XMLHttpRequest();
setInterval(function () {
    xhr.open('GET', '/user');
    xhr.onreadystatechange = function () {

    };
    xhr.send();
}, 1000)
