import { useTheme } from 'dopenative'
import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text, ScrollView, TouchableOpacity } from 'react-native'
import dynamicStyles from './style'

const CountriesModalPicker = props => {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [animationType, setAnimationType] = useState('slide')
  const [modalVisible, setModalVisible] = useState(false)
  const [selected, setSelected] = useState('please select')
  const [data, setData] = useState([])
  const modal = useRef(null)

  useEffect(() => {
    setSelected(props.initValue)
    setData(props.data)
    setModalVisible(props.visible)
  })

  const close = () => {
    setModalVisible(false)
  }

  const onChange = item => {
    props.onChange(item)
    setSelected(item.label)
    props.onCancel()
  }

  const renderOption = option => {
    return (
      <TouchableOpacity key={option.key} onPress={() => onChange(option)}>
        <View style={[styles.optionStyle, props.optionStyle]}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={[styles.optionTextStyle, props.optionTextStyle]}>
              {option.label}
            </Text>
          </View>
          <Text style={[styles.optionTextStyle, props.optionTextStyle]}>
            {option.dialCode}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderOptionList = () => {
    const options = data.map(item => {
      return renderOption(item)
    })

    return (
      <View
        style={[styles.overlayStyle, props.overlayStyle]}
        // key={`modalPicker${componentIndex++}`}
      >
        <View style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ paddingHorizontal: 10 }}>{options}</View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={() => props.onCancel()}>
            <View style={[styles.cancelStyle, props.cancelStyle]}>
              <Text style={[styles.cancelTextStyle, props.cancelTextStyle]}>
                {props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const dp = (
    <Modal
      transparent
      ref={modal}
      visible={modalVisible}
      onRequestClose={close}
      animationType={animationType}>
      {renderOptionList()}
    </Modal>
  )

  return <View style={props.style}>{dp}</View>
}

CountriesModalPicker.defaultProps = {
  data: [],
  onChange: () => {},
  initValue: 'Select me!',
  style: {},
  selectStyle: {},
  optionStyle: {},
  optionTextStyle: {},
  sectionStyle: {},
  sectionTextStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: 'cancel',
}

export default CountriesModalPicker
