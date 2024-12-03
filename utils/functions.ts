import dayjs from 'dayjs'

function randomFutureDayCurrentMonth(){
    const currentDate = dayjs()
    const lastMonthDay = currentDate.endOf('month').date()
    const randomDay = Math.floor(Math.random() * (lastMonthDay - currentDate.date()+1)) + currentDate.date()
    let randomDate = (dayjs().date(randomDay).format('MM/DD/'))
    //let day = randomDate.split('-')[1]
    return randomDate
}

export { randomFutureDayCurrentMonth }