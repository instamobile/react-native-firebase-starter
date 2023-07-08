// Alert.web.ts

class WebAlert {
  alert(title, message, buttons) {
    if (buttons === undefined || buttons.length === 0) {
      window.alert([title, message].filter(Boolean).join('\n'))
      return
    }

    const result = window.confirm([title, message].filter(Boolean).join('\n'))

    if (result === true) {
      const confirm = buttons.find(({ style }) => style !== 'cancel')
      confirm?.onPress?.()
      return
    }

    const cancel = buttons.find(({ style }) => style === 'cancel')
    cancel?.onPress?.()
  }
}

export const Alert = new WebAlert()
