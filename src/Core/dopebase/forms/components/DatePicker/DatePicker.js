import React, { useState } from 'react'
import { Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useTheme } from '../../../core'
import dynamicStyles from './styles'

// value is a timestamp in seconds. Make sure handleDate gets called with a timestamp as well
export const DatePicker = ({ value, title, handleDate = () => {} }) => {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [date, setDate] = useState(value ? new Date(value * 1000) : new Date())

  const onChange = (event, selectedDate) => {
    setDate(selectedDate)
    handleDate(selectedDate.getTime() / 1000)
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.dateContainer}>
          <DateTimePicker
            style={styles.date}
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={onChange}
          />
        </View>
      </View>
    </>
  )
}
