import React, { useState } from 'react'
import { Text, View } from 'react-native'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import { useTheme } from '../../../core'
import { useTranslations } from '../../../core'
import dynamicStyles from './styles'

export const DatePicker = ({ value, title, handleDate = () => {} }) => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [date, setDate] = useState(value ? new Date(value * 1000) : new Date())

  const onChangeDate = selectedDate => {
    setDate(selectedDate)
    handleDate(selectedDate.getTime() / 1000)
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.dateContainer}>
        <ReactDatePicker
          customInput={
            <View style={styles.dateTextContainer}>
              <Text style={styles.date}>
                {date ? date.toLocaleString() : localized('Select date')}
              </Text>
            </View>
          }
          selected={date}
          onChange={onChangeDate}
        />
      </View>
    </View>
  )
}
