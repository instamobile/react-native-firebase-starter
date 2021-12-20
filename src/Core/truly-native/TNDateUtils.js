import moment from 'moment'

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const TNDateFormattedTimestamp = timestamp => {
  if (timestamp) {
    let time = moment(timestamp.toDate())
    if (moment().diff(time, 'days') == 0) {
      return time.format('H:mm')
    } else if (moment().diff(time, 'week') == 0) {
      return time.fromNow()
    } else {
      return `${monthNames[timestamp.toDate().getMonth()]} ${time.format(
        'D, Y',
      )}`
    }
  }
  return ''
}

export default TNDateFormattedTimestamp
