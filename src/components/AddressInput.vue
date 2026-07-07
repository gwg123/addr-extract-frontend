<template>
  <div class="flex flex-col gap-md">
    <div class="relative">
      <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="disabled"
        :class="[
          'w-full min-h-[160px] p-md bg-surface-bright border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all resize-y placeholder:text-outline',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        ]"
        :placeholder="t('page.placeholder')"
      ></textarea>
      <button
        type="button"
        :disabled="disabled"
        class="absolute bottom-md right-md bg-surface-container-low text-on-surface-variant p-2 rounded-lg hover:bg-surface-container-highest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Copy"
      >
        <span class="material-symbols-outlined text-sm">content_copy</span>
      </button>
    </div>
    <button
      type="button"
      @click="$emit('identify')"
      :disabled="disabled"
      :class="[
        'w-full md:w-auto self-end bg-primary-container text-on-primary h-[48px] px-lg rounded-lg font-label-md text-label-md flex items-center justify-center gap-sm transition-all shadow-sm',
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:opacity-90 active:scale-95'
      ]"
    >
      <span
        class="material-symbols-outlined"
        style="font-variation-settings: 'FILL' 1;"
      >psychology</span>
      {{ t('page.identifyBtn') }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
defineEmits(['update:modelValue', 'identify'])
</script>