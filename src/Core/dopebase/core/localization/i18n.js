import React, { useCallback, useEffect, useState, useRef } from 'react'
import { I18nManager } from 'react-native'
import Storage from '@react-native-async-storage/async-storage'
import I18n from 'i18n-js'
import * as Localization from 'expo-localization'

export const TranslationContext = React.createContext({})

export const TranslationProvider = ({ children, translations }) => {
  const [locale, setLocale] = useState(Localization.locale)

  console.log('setting up translations')
  console.log(`local locale: ${Localization.locale} `)
  console.log(`default locale: ${locale} `)

  const localized = useCallback(
    (key, config) =>
      I18n.t(key, { ...config, locale }).includes('missing')
        ? key
        : I18n.t(key, { ...config, locale }),
    [locale],
  )

  const getLocale = useCallback(async () => {
    const localeJSON = await Storage.getItem('locale')
    console.log(
      `getting locale from storage and writing it to memory ${localeJSON}`,
    )

    // If we have a locale stored in local storage, that is high priority (it overrides the current device locale)
    setLocale(localeJSON !== null ? localeJSON : Localization.locale)
  }, [setLocale])

  useEffect(() => {
    getLocale()
  }, [getLocale])

  useEffect(() => {
    console.log(`write to storage locale: ${locale}`)
    Storage.setItem('locale', locale)
    setI18nConfig()
  }, [locale])

  const setI18nConfig = () => {
    const fallback = { languageTag: 'en' }
    I18n.translations = translations
    I18n.locale = locale
    I18n.fallbacks = true
    I18nManager.forceRTL(Localization.isRTL)
  }

  const value = {
    localized,
    setAppLocale: setLocale,
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}
