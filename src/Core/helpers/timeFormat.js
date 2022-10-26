import moment from 'moment'

const date = new Date()
date.getTime() / 1000

export const timeFormat = timeStamp => {
  if (moment(timeStamp).isValid()) {
    if (moment().diff(moment.unix(timeStamp), 'days') === 0) {
      return moment.unix(timeStamp, ['hh:mm']).format('h:mm a') // 3:20 pm
    } else if (moment().diff(moment.unix(timeStamp), 'days') < 7) {
      return moment.unix(timeStamp).format('ddd') // Tue, Wed etc
    } else {
      return moment.unix(timeStamp).format('D MMM') // 20 Jan
    }
  }
  return ' '
}

export const getUnixTimeStamp = () => {
  return moment().unix()
}
