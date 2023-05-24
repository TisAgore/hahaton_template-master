const axios = require('axios')

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
function generateMessage() {
    let workshopId = randomInteger(1, 2)
    let lineId = null
    let sensorId = null
    if (workshopId == 1) {
        lineId = randomInteger(1, 3)
        if (lineId == 1) {
            sensorId = randomInteger(1, 3)
        } else if (lineId == 2) {
            sensorId = randomInteger(4, 6)
        } else {
            sensorId = randomInteger(7, 9)
        }
    } else {
        lineId = randomInteger(4, 6)
        if (lineId == 4) {
            sensorId = randomInteger(10, 12)
        } else if (lineId = 5) {
            sensorId = randomInteger(13, 15)
        } else {
            sensorId = randomInteger(16, 18)
        }
    }
    let value = null
    if (sensorId%3 == 1) {
        value = randomInteger(0, 180)
    } else if (sensorId%3 == 2) {
        value = randomInteger(500, 3000)
    } else {
        value = randomInteger(1, 8)
    }
    return { workshopId, lineId, sensorId, value }
}

async function send(body){
    let data = await axios.post('http://127.0.0.1:3000/messages/insert', body, {
        headers: {
        'Access-Control-Allow-Origin': '*'
        },
    })
    return data
}


setInterval(function s(){
    console.log('Отправили')
    let body = generateMessage()
    let data = send(body)
    console.log(body, data)
}, 3000)

// while (true) {
//     setTimeout(
//         () => {
            
//             let body = generateMessage()
//             let data = send(body)
            
//         }, 3)
// }
