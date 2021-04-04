/**
 * 在这里写代码以获得语法提示
 */

function fetchRequest(method, url, data = {}, timeout = 5000) {
    let payload = null;
    let query = '';
    if (method === "GET") {
        for (const key in data) {
            query += `&${key}=${data[key]}`
        }
        if (query) {
            query = '?' + query.slice(1)
        }
    } else {
        payload = JSON.stringify(data)
    }

    return new Promise((resolve, reject) => {
        fetch(url + query, {
            credentials: 'include',
            method: method,
            header: {
                "Content-Type": "xxx"
            },
            body: payload
        }).then(response => {
            return response.json()
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
        setTimeout(() => {
            reject(reject.bind(this, 'fetch i timeout'))
        }, timeout)
    })
}

function clickFetchRequest() {
    fetchRequest("GET", "xxx")
        .then(res => {
            console.log("Fetch success", res);
        })
        .catch(err => {
            console.log(err)
        })
}

clickFetchRequest()



function ajax(method, url, data, sccess, fail) {
    const XHR = new XMLHttpRequest();
    let sendData = "";
    for (const key in data) {
        sendData += '&' + key + '=' + data[key]
    }
    switch (method) {
        case 'GET':
            url = sendData ? `${url}?${sendData}` : url
            sendData = null;
            break
        case 'POST':
            if (sendData) {
                sendData = sendData.slice(1)
            }
            break;
    }
    XHR.onreadystatechange = function () {
        if (XHR.readyState !== 4) return;
        if (XHR.status === 200 || XHR.status === 304) {
            typeof sccess === "function" && success(XHR.response)
        } else {
            typeof fail === "function" && fail(XHR)
        }
    }
    XHR.open(method, url, true)
    XHR.setRequestHeader("Content-Type", "application/x-www/from-urlencoded")
    XHR.send(sendData)
}


function ajaxRequest() {
    const error = {
        message: "",
        info: null
    }
    ajax({
        url: "xxx",
        method: "GET",
        data: {

        },
        overtime: 5000,
        success: function (res, response) {
            console.log("请求成功", res);
            console.log("原始响应数据 >>", response);
        },
        fail: function (err) {

        }
    });
}