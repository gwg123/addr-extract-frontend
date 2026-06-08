import { ref, computed } from 'vue'
import en from './en'
import zh from './zh'

const currentLang = ref('en')

export function useI18n() {
  const messages = { en, zh }
  
  const t = computed(() => {
    const lang = messages[currentLang.value] || en
    return (key) => {
      const keys = key.split('.')
      let result = lang
      for (const k of keys) {
        result = result?.[k]
        if (result === undefined) return key
      }
      return result
    }
  })

  const toggleLang = () => {
    currentLang.value = currentLang.value === 'en' ? 'zh' : 'en'
  }

  return {
    currentLang,
    t,
    toggleLang
  }
}
