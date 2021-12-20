import moment from 'moment'

const date = new Date()
date.getTime() / 1000

export const timeFormat = timeStamp => {
  if (timeStamp) {
    if (moment(timeStamp).isValid()) {
      return moment.unix(timeStamp).fromNow()
    }
    if (moment().diff(moment.unix(timeStamp.seconds), 'days') == 0) {
      return moment.unix(timeStamp.seconds).format('H:mm')
    }
    return moment.unix(timeStamp.seconds).fromNow()
  }
  return ' '
}

export const getUnixTimeStamp = () => {
  return moment().unix()
}
