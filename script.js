console.log("Billboard")

const messageDiv = document.getElementById("message")
const sendBtn = document.getElementById('btn')


fetch('http://localhost:8000/msg').then((res) => {
    res.json().then((data) => {

        data.map(message => {
            const p = document.createElement('p')
            p.innerHTML = message.message + " " + message.timestamp

            messageDiv.appendChild(p)
        })
    })
})

sendBtn.onclick = async () => {
    const data = {message: "testing button"}

    await fetch('http://localhost:8000/msg', {
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
                const p = document.createElement('p')
                p.innerHTML = message.message + " " + message.timestamp

                messageDiv.appendChild(p)
            })
        })
    })
}