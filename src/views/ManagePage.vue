<template>
  <div
    class="w-full max-w-3xl bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-surface-variant p-lg md:p-xl flex flex-col gap-xl"
  >
    <!-- Header Section -->
    <div class="flex flex-col gap-sm text-center md:text-left">
      <h1 class="font-title-md text-title-md text-on-surface">{{ t('page.title') }}</h1>
      <p class="font-body-md text-body-md text-on-surface-variant">
        {{ t('page.subtitle') }}
      </p>
    </div>

    <!-- Recognition Area -->
    <AddressInput 
      v-model="rawText" 
      @identify="handleIdentify"
      :disabled="loading" 
    />

    <hr class="border-outline-variant/30" />

    <!-- Result Form -->
    <ExtractedForm ref="formRef" v-model="form" @save="handleSave" />

    <!-- Loading Overlay -->
    <LoadingOverlay :visible="loading" :message="currentLang === 'en' ? 'Processing...' : '处理中...'" />

    <!-- Toast -->
    <Toast :visible="toast.visible" :message="toast.message" :type="toast.type" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from '../i18n'
import { extractAddress } from '../api'
import AddressInput from '../components/AddressInput.vue'
import ExtractedForm from '../components/ExtractedForm.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'
import Toast from '../components/Toast.vue'

const { t, currentLang } = useI18n()

const rawText = ref('')
const loading = ref(false)
const formRef = ref(null)

const form = ref({
  recipientName: '',
  phoneNumber: '',
  region: '',
  city: '',
  district: '',
  detail: ''
})

const toast = reactive({
  visible: false,
  message: '',
  type: 'success'
})

function showToast(message, type = 'success') {
  toast.message = message
  toast.type = type
  toast.visible = true
  setTimeout(() => {
    toast.visible = false
  }, 3000)
}

async function handleIdentify() {
  const text = (rawText.value || '').trim()
  if (!text) {
    showToast(
      currentLang.value === 'en' ? 'Please enter address text' : '请输入地址文本',
      'error'
    )
    return
  }

  loading.value = true

  try {
    const data = await extractAddress(text)
    
    // 更新表单数据
    form.value = {
      recipientName: data.name || '',
      phoneNumber: data.phone || '',
      region: data.province || '',
      city: data.city || '',
      district: data.district || '',
      detail: data.specific_location || ''
    }

    showToast(
      currentLang.value === 'en' ? 'Address extracted successfully' : '地址识别成功',
      'success'
    )
  } catch (error) {
    console.error('Extract address failed:', error)
    showToast(
      currentLang.value === 'en' 
        ? `Extraction failed: ${error.message}` 
        : `识别失败: ${error.message}`,
      'error'
    )
  } finally {
    loading.value = false
  }
}

function isValidPhone(phone) {
  const chinaMobile = /^(?:\+?86)?1[3-9]\d{9}$/
  const chinaLandline = /^(?:\+?86)?(?:0\d{2,3}-)?\d{7,8}$/
  const usPhone = /^(\+?1)?[\s.-]?\(?[2-9]\d{2}\)?[\s.-]?[2-9]\d{2}[\s.-]?\d{4}$/
  const international = /^\+[1-9]\d{2,14}$/
  
  return chinaMobile.test(phone) || 
         chinaLandline.test(phone) || 
         usPhone.test(phone) || 
         international.test(phone)
}

function handleSave(areaData) {
  const { recipientName, phoneNumber, region, city, district, detail } = form.value
  
  if (!recipientName.trim()) {
    showToast(
      currentLang.value === 'en' 
        ? 'Please fill in the recipient name or use smart identification' 
        : '请填写收件人姓名或使用智能识别',
      'error'
    )
    return
  }

  if (!phoneNumber.trim()) {
    showToast(
      currentLang.value === 'en' 
        ? 'Please fill in the phone number or use smart identification' 
        : '请填写联系电话或使用智能识别',
      'error'
    )
    return
  }

  if (!isValidPhone(phoneNumber)) {
    showToast(
      currentLang.value === 'en' 
        ? 'Please enter a valid phone number' 
        : '请输入有效的手机号码',
      'error'
    )
    return
  }

  const regionValue = areaData?.region || region
  if (!regionValue) {
    showToast(
      currentLang.value === 'en' 
        ? 'Please select province/city/district or use smart identification' 
        : '请选择省市区或使用智能识别',
      'error'
    )
    return
  }

  showToast(t('page.savedMessage'), 'success')

  rawText.value = ''
  form.value = {
    recipientName: '',
    phoneNumber: '',
    region: '',
    city: '',
    district: '',
    detail: ''
  }

  formRef.value?.reset()
}
</script>