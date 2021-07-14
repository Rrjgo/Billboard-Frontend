console.log("Billboard")

const endpoint = 'https://billboard-backend-hj.herokuapp.com'

const messageDiv = document.getElementById("message")
const sendBtn = document.getElementById('sendBtn')

const searchDiv = document.getElementById("search")
const searchBtn = document.getElementById('searchBtn')

const fetchJSON = async (url, params) => {
    return (await fetch(url, params)).json()
}

fetchJSON(`${endpoint}/msg`).then((data) => {
    data.map(message => {
        const firstChild = messageDiv.firstChild

        const p = document.createElement('p')
        p.innerHTML = message.timestamp + " " + message.message

        messageDiv.insertBefore(p, firstChild)
    })

    if (data.length === 0) {
        const firstChild = messageDiv.firstChild

        const p = document.createElement('p')
        p.innerHTML = "No message found"

        messageDiv.insertBefore(p, firstChild)
    }
})

sendBtn.onclick = async () => {
    const data = { message: document.getElementById("textBox").value }

    await fetch(`${endpoint}/msg`, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })

    messageDiv.innerHTML = ""

    const messages = await fetchJSON(`${endpoint}/msg`)

    messages.map(message => {
        const firstChild = messageDiv.firstChild

        const p = document.createElement('p')
        p.innerHTML = message.timestamp + " " + message.message

        messageDiv.insertBefore(p, firstChild)
    })

    if (messages.length === 0) {
        const firstChild = messageDiv.firstChild

        const p = document.createElement('p')
        p.innerHTML = "No message found"

        messageDiv.insertBefore(p, firstChild)
    }
}

searchBtn.onclick = async () => {
    const searchdata = { message: document.getElementById("searchBox").value }

    searchDiv.innerHTML = ""

    fetch(`${endpoint}/msg/search`, {
        body: JSON.stringify(searchdata), // must match 'Content-Type' header
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
    }).then((res) => {
        return res.json()
    }).then((data) => {
        data.map(message => {
            const firstChild = searchDiv.firstChild

            const p = document.createElement('p')
            p.innerHTML = message.timestamp + " " + message.message

            searchDiv.insertBefore(p, firstChild)
        })
        if (data.length === 0) {
            const firstChild = searchDiv.firstChild
    
            const p = document.createElement('p')
            p.innerHTML = "No message found"
    
            searchDiv.insertBefore(p, firstChild)
        }
    })
}