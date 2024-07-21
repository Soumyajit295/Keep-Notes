function getTime(){
    let date = new Date()
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let month = months[date.getMonth()]
    let toadyDate = date.getDate()
    let year = date.getFullYear()

    let hour = date.getHours()
    let minutes = date.getMinutes()
    let period = hour >=12 ? 'AM' : 'PM'

    let time = `${hour}:${minutes} ${period}`
    return `Added on ${toadyDate} ${month} ${year} ${time}`
}

console.log(getTime())