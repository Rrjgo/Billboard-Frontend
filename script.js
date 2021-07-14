console.log("Billboard")

const WEB_URL = https://billboard-backend-hj.herokuapp.com/msg

const messageDiv = document.getElementById("message")
const sendBtn = document.getElementById('sendBtn')

const searchDiv = document.getElementById("search")
const searchBtn = document.getElementById('searchBtn')

fetch(WEB_URL).then((res) => {
    res.json().then((data) => {

        data.map(message => {
            const firstChild = messageDiv.firstChild

            const p = document.createElement('p')
            p.innerHTML = message.timestamp + " " + message.message

            messageDiv.insertBefore(p, firstChild)
        })
    })
})

sendBtn.onclick = async () => {
    const data = { message: document.getElementById("textBox").value }

    await fetch(WEB_URL, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })

    messageDiv.innerHTML = ""

    fetch('http://localhost:8000/msg').then((res) => {
        res.json().then((data) => {

            data.map(message => {
                const firstChild = messageDiv.firstChild

                const p = document.createElement('p')
                p.innerHTML = message.timestamp + " " + message.message

                messageDiv.insertBefore(p, firstChild)
            })
        })
    })
}

searchBtn.onclick = async () => {
    const searchdata = { message: document.getElementById("searchBox").value }

    await fetch('http://localhost:8000/msg/search', {
        body: JSON.stringify(searchdata), // must match 'Content-Type' header
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })

    searchDiv.innerHTML = ""

    fetch('http://localhost:8000/msg/search').then((res) => {
        res.json().then((data) => {

            data.map(message => {
                const firstChild = searchDiv.firstChild

                const p = document.createElement('p')
                p.innerHTML = message.timestamp + " " + message.message

                searchDiv.insertBefore(p, firstChild)
            })
        })
    })
    

}