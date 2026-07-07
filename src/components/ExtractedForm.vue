<template>
  <div class="flex flex-col gap-lg">
    <div class="flex items-center gap-sm">
      <span class="material-symbols-outlined text-primary-container">list_alt</span>
      <h2 class="font-title-md text-title-md text-on-surface">{{ t('page.extracted') }}</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
      <!-- Recipient Name -->
      <div class="flex flex-col gap-sm">
        <label class="font-label-md text-label-md text-on-surface-variant">{{ t('page.recipientName') }}</label>
        <input
          :value="modelValue.recipientName"
          @input="update('recipientName', $event.target.value)"
          type="text"
          :placeholder="currentLang === 'en' ? 'John Doe' : '张三'"
          class="w-full h-[48px] px-md bg-surface-bright border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all"
        />
      </div>

      <!-- Phone Number -->
      <div class="flex flex-col gap-sm">
        <label class="font-label-md text-label-md text-on-surface-variant">{{ t('page.phoneNumber') }}</label>
        <input
          :value="modelValue.phoneNumber"
          @input="update('phoneNumber', $event.target.value)"
          type="tel"
          :placeholder="currentLang === 'en' ? '+1 555-0198' : '+86 138 0013 8000'"
          class="w-full h-[48px] px-md bg-surface-bright border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all"
        />
      </div>

      <!-- Region / Province / City -->
      <div class="flex flex-col gap-sm md:col-span-2">
        <label class="font-label-md text-label-md text-on-surface-variant">{{ t('page.region') }}</label>
        <div class="grid grid-cols-3 gap-sm">
          <select
            :value="localProvince"
            @change="handleProvinceChange"
            class="w-full h-[48px] px-md bg-surface-bright border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled>{{ t('page.selectProvince') }}</option>
            <option v-for="p in provinces" :key="p.code" :value="p.name">{{ p.name }}</option>
          </select>
          <select
            :value="localCity"
            @change="handleCityChange"
            :disabled="!localProvince"
            class="w-full h-[48px] px-md bg-surface-bright border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="" disabled>{{ t('page.selectCity') }}</option>
            <option v-for="c in cities" :key="c.code" :value="c.name">{{ c.name }}</option>
          </select>
          <select
            :value="localDistrict"
            @change="handleDistrictChange"
            :disabled="!localCity"
            class="w-full h-[48px] px-md bg-surface-bright border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="" disabled>{{ t('page.selectDistrict') }}</option>
            <option v-for="d in districts" :key="d.code" :value="d.name">{{ d.name }}</option>
          </select>
        </div>
      </div>

      <!-- Detailed Address -->
      <div class="flex flex-col gap-sm md:col-span-2">
        <label class="font-label-md text-label-md text-on-surface-variant">{{ t('page.detailAddress') }}</label>
        <input
          :value="modelValue.detail"
          @input="update('detail', $event.target.value)"
          type="text"
          :placeholder="currentLang === 'en' ? '123 Main St, Apt 4B' : '世纪大道123号，4B室'"
          class="w-full h-[48px] px-md bg-surface-bright border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all"
        />
      </div>
    </div>

    <div class="flex justify-end mt-sm">
      <button
        type="button"
        @click="handleSave"
        class="w-full md:w-auto bg-primary text-on-primary h-[48px] px-xl rounded-lg font-label-md text-label-md flex items-center justify-center gap-sm hover:bg-on-primary-fixed-variant active:scale-95 transition-all shadow-sm"
      >
        <span
          class="material-symbols-outlined"
          style="font-variation-settings: 'FILL' 1;"
        >save</span>
        {{ t('page.confirmBtn') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from '../i18n'
import { getAllProvinces, getCitiesByProvince, getCountiesByCity, getProvinceCode, getCityCode } from '../utils/area'


const { t, currentLang } = useI18n()

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:modelValue', 'save'])

const provinces = ref(getAllProvinces())

const localProvince = ref(props.modelValue.region || '')
const localCity = ref(props.modelValue.city || '')
const localDistrict = ref(props.modelValue.district || '')

const cities = computed(() => {
  if (!localProvince.value) return []
  const provinceCode = getProvinceCode(localProvince.value)
  if (!provinceCode) return []
  return getCitiesByProvince(provinceCode)
})

const districts = computed(() => {
  if (!localCity.value) return []
  const provinceCode = getProvinceCode(localProvince.value)
  if (!provinceCode) return []
  const cityCode = getCityCode(provinceCode, localCity.value)
  if (!cityCode) return []
  return getCountiesByCity(cityCode)
})

watch(() => props.modelValue.region, (newRegion) => {
  localProvince.value = newRegion || ''
})

watch(() => props.modelValue.city, (newCity) => {
  localCity.value = newCity || ''
})

watch(() => props.modelValue.district, (newDistrict) => {
  localDistrict.value = newDistrict || ''
})

watch([() => props.modelValue.region, () => props.modelValue.city, () => props.modelValue.district], 
  ([newRegion, newCity, newDistrict]) => {
  if (newRegion) {
    localProvince.value = newRegion
    setTimeout(() => {
      if (newCity) {
        localCity.value = newCity
        setTimeout(() => {
          if (newDistrict) {
            localDistrict.value = newDistrict
          }
        }, 0)
      }
    }, 0)
  }
}, { immediate: true })

function handleProvinceChange(event) {
  const provinceName = event.target.value
  localProvince.value = provinceName
  localCity.value = ''
  localDistrict.value = ''
  update('region', provinceName)
  update('city', '')
  update('district', '')
}

function handleCityChange(event) {
  const cityName = event.target.value
  localCity.value = cityName
  localDistrict.value = ''
  update('city', cityName)
  update('district', '')
}

function handleDistrictChange(event) {
  const districtName = event.target.value
  localDistrict.value = districtName
  update('district', districtName)
}

function update(key, value) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function handleSave() {
  emit('save', {
    region: localProvince.value,
    city: localCity.value,
    district: localDistrict.value
  })
}

function reset() {
  localProvince.value = ''
  localCity.value = ''
  localDistrict.value = ''
}

defineExpose({ reset })
</script>