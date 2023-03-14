((doc) => {
    const oList = doc.querySelector('#list')
    const oMsg = doc.querySelector('#message')
    const oSendbtn = doc.querySelector('#send')
    const ws = new WebSocket('ws:localhost:8000')
    let userName = ''
    let passWord = ''
    const init = () => {
        let url = location.search
        console.log(url);
        if (url.indexOf('?') !== -1) {
            let str = String(url).slice(0)
            let arr = str.split('&')
            userName = arr[0].split('=')[1]
            passWord = arr[1].split('=')[1]
            console.log('userNamepassWord', userName, passWord)
        }
        bindEvent()
    }

    // 绑定事件处理函数
    function bindEvent() {
        oSendbtn.addEventListener('click', handSend, false)
        console.log('ws', ws)
        ws.addEventListener('open', handleOpen, false)
        ws.addEventListener('close', handleClose, false)
        ws.addEventListener('error', handleError, false)
        ws.addEventListener('message', handleMessage, false)
    }
    function handSend(e) {
        const msg = oMsg.value
        if (!msg.trim().length) {
            return
        }
        // 这里需传json字符串，二进制等
        ws.send(JSON.stringify({
            user: userName,
            passsword: passWord,
            msg,
            dateTime: new Date()
        }))
        console.log('send', e)
        oMsg.value = ''
    }
    function handleOpen(e) {
        console.log('open', e)
    }
    function handleClose(e) {
        console.log('close', e)
    }
    function handleError(e) {
        console.log('error', e)
    }
    function handleMessage(e) {
        console.log('message', e)
        const msgData = JSON.parse(e.data)
        console.log('msgData', msgData)
        oList.appendChild(createMsg(msgData))
    }
    function createMsg(data) {
        const { user, msg, dateTime } = data
        const oItem = doc.createElement('li')
        oItem.innerHTML = `
     <p>
     <span>${user}</span>
     <i>${dateTime}</i>
     </p>
     <p>消息：${msg}</p>
     `
        return oItem
    }
    init()
})(document)
