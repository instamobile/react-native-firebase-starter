import React, { useEffect, useState } from 'react'
import { Modal, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import { useTheme } from '../../../core'
import { useTranslations } from '../../..'
import dynamicStyles from './styles'
import { Calendar } from 'react-native-calendars'
import moment from 'moment'

export const DateRangePicker = props => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { title } = props

  const [isVisible, setIsVisible] = useState(false)
  const [selectedDays, setSelectedDays] = useState()
  const [startDay, setStartDay] = useState(props.startDay)
  const [endDay, setEndDay] = useState(props.endDay)

  useEffect(() => {
    setSelectedDays(getSelectedDateRange(props.startDay, props.endDay))
  }, [])

  const getSelectedDateRange = (startDayString, endDayString) => {
    const selectedDays = {}
    const tempStartDay = moment(startDayString)
    const tempEndDay = moment(endDayString)

    for (
      let day = tempStartDay;
      day.diff(tempEndDay) <= 0;
      day = day.add(1, 'days')
    ) {
      selectedDays[day.format('YYYY-MM-DD')] = {
        selected: true,
        startingDay: true,
        color: theme.colors[appearance].grey6,
        textColor: theme.colors[appearance].primaryText,
      }
    }

    return selectedDays
  }

  const onDayPress = day => {
    if (Object.keys(selectedDays).length === 0) {
      setStartDay(day.dateString)
      setEndDay(day.dateString)
      setSelectedDays(getSelectedDateRange(day.dateString, day.dateString))
    } else {
      setEndDay(day.dateString)
      setSelectedDays(getSelectedDateRange(startDay, day.dateString))
    }
  }

  const onDayLongPress = () => {
    setSelectedDays({})
  }

  const onCancel = () => {
    setIsVisible(false)
  }

  const onDone = () => {
    if (Object.keys(selectedDays).length) {
      props.onDone({ startDay: startDay, endDay: endDay })
      setIsVisible(false)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{localized(title)}</Text>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.dateTextContainer}
            onPress={() => setIsVisible(prev => !prev)}>
            <Text style={styles.date}>{startDay ?? 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateTextContainer}
            onPress={() => setIsVisible(prev => !prev)}>
            <Text style={styles.date}>{endDay ?? 'End'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={onCancel}>
        <SafeAreaView style={styles.modalView}>
          <View style={styles.headerBar}>
            <TouchableOpacity style={styles.btn} onPress={onCancel}>
              <Text>{localized('Cancel')}</Text>
            </TouchableOpacity>
            <Text style={styles.calenderTitle}>Select Dates</Text>
            <TouchableOpacity style={styles.btn} onPress={onDone}>
              <Text>{localized('Done')}</Text>
            </TouchableOpacity>
          </View>
          <Calendar
            onDayPress={onDayPress}
            onDayLongPress={onDayLongPress}
            hideExtraDays
            markedDates={selectedDays}
          />
        </SafeAreaView>
      </Modal>
    </>
  )
}
