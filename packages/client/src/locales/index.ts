import {createI18n} from 'vue-i18n'
// element-plus
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
// defined lang
import enLocale from './en'
import zhLocale from './zh-cn'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  'zh-cn': {
    ...zhLocale,
    ...elementZhLocale,
  },
}

export const getLocale = () => {
  const storageLanguage = localStorage.getItem('locale')
  if (storageLanguage) return storageLanguage

  const navigatorLanguage = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  if (locales.includes(navigatorLanguage)) return navigatorLanguage

  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: 'en',
  messages,
})

export default i18n
