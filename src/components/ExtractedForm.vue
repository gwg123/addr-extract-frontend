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
            :value="modelValue.region"
            @change="update('region', $event.target.value)"
            class="w-full h-[48px] px-md bg-surface-bright border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all appearance-none cursor-pointer"
          >
            <option v-for="o in regions" :key="o.key" :value="o.value">{{ t(o.key) }}</option>
          </select>
          <select
            :value="modelValue.city"
            @change="update('city', $event.target.value)"
            class="w-full h-[48px] px-md bg-surface-bright border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all appearance-none cursor-pointer"
          >
            <option v-for="o in cities" :key="o.key" :value="o.value">{{ t(o.key) }}</option>
          </select>
          <select
            :value="modelValue.district"
            @change="update('district', $event.target.value)"
            class="w-full h-[48px] px-md bg-surface-bright border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all appearance-none cursor-pointer"
          >
            <option v-for="o in districts" :key="o.key" :value="o.value">{{ t(o.key) }}</option>
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
        @click="$emit('save')"
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
import { useI18n } from '../i18n'

const { t, currentLang } = useI18n()

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:modelValue', 'save'])

const regions = [
  { key: 'regions.newYork', value: 'New York' },
  { key: 'regions.california', value: 'California' }
]
const cities = [
  { key: 'cities.newYorkCity', value: 'New York City' },
  { key: 'cities.albany', value: 'Albany' }
]
const districts = [
  { key: 'districts.manhattan', value: 'Manhattan' },
  { key: 'districts.brooklyn', value: 'Brooklyn' }
]

function update(key, value) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>
