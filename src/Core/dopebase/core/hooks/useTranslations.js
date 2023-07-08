import { useContext } from 'react'

import { TranslationContext } from '../localization/i18n'

export const useTranslations = () => useContext(TranslationContext)
