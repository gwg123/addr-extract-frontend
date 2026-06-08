<template>
  <header class="w-full shadow-sm bg-surface">
    <div class="flex justify-between items-center px-gutter py-md max-w-container-max mx-auto">
      <div
        class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary"
      >
        LogisticsPro
      </div>
      <nav class="hidden md:flex gap-lg">
        <a
          v-for="item in navItems"
          :key="item.key"
          href="#"
          :class="[
            'font-body-md text-body-md cursor-pointer active:scale-95 duration-150 py-2 transition-colors',
            item.active
              ? 'text-primary font-bold border-b-2 border-primary pb-1'
              : 'text-on-surface-variant hover:text-primary'
          ]"
        >
          {{ t(item.key) }}
        </a>
      </nav>
      <div class="flex items-center gap-md">
        <!-- Language Toggle Button -->
        <button
          @click="toggleLang"
          class="px-3 py-1.5 bg-surface-container-low text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-highest transition-all cursor-pointer active:scale-95 duration-150"
        >
          {{ currentLang === 'en' ? '中文' : 'EN' }}
        </button>
        <button
          class="p-2 rounded-full hover:bg-surface-container-low transition-all cursor-pointer active:scale-95 duration-150 text-primary"
          aria-label="Notifications"
        >
          <span
            class="material-symbols-outlined"
            style="font-variation-settings: 'FILL' 0;"
          >notifications</span>
        </button>
        <button
          class="p-2 rounded-full hover:bg-surface-container-low transition-all cursor-pointer active:scale-95 duration-150 text-primary"
          aria-label="Account"
        >
          <span
            class="material-symbols-outlined"
            style="font-variation-settings: 'FILL' 0;"
          >account_circle</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from '../i18n'

const { currentLang, t, toggleLang } = useI18n()

const navItems = [
  { key: 'nav.ship', active: false },
  { key: 'nav.track', active: false },
  { key: 'nav.manage', active: true }
]
</script>
