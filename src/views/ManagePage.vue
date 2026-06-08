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
    <AddressInput v-model="rawText" @identify="handleIdentify" />

    <hr class="border-outline-variant/30" />

    <!-- Result Form -->
    <ExtractedForm v-model="form" @save="handleSave" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../i18n'
import AddressInput from '../components/AddressInput.vue'
import ExtractedForm from '../components/ExtractedForm.vue'

const { t } = useI18n()

const rawText = ref('')

const form = ref({
  recipientName: '',
  phoneNumber: '',
  region: 'New York',
  city: 'New York City',
  district: 'Manhattan',
  detail: ''
})

function handleIdentify() {
  const text = (rawText.value || '').trim()
  if (!text) return

  const next = { ...form.value }

  const phoneMatch = text.match(/(\+?\d[\d\s-]{8,}\d)/)
  if (phoneMatch) {
    next.phoneNumber = phoneMatch[1].trim()
  }

  const nameMatch = text.match(/^([A-Za-z\u4e00-\u9fa5 .'-]{2,30})\s*[,，]/)
  if (nameMatch) {
    next.recipientName = nameMatch[1].trim()
  }

  let remain = text
  if (phoneMatch) remain = remain.replace(phoneMatch[1], '')
  if (nameMatch) remain = remain.replace(nameMatch[0], ' ')
  remain = remain.replace(/^[,，\s]+|[,，\s]+$/g, '')
  if (remain) {
    next.detail = remain
  }

  form.value = next
}

function handleSave() {
  const f = form.value
  // eslint-disable-next-line no-alert
  alert(
    `${t('page.savedMessage')}\n${t('page.recipientName')}: ${f.recipientName}\n${t('page.phoneNumber')}: ${f.phoneNumber}\n` +
      `${t('page.region')}: ${f.region} / ${f.city} / ${f.district}\n` +
      `${t('page.detailAddress')}: ${f.detail}`
  )
}
</script>
