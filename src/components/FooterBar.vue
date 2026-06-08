<template>
  <footer class="w-full bg-surface-container-lowest border-t border-outline-variant mt-auto">
    <div
      class="w-full py-lg px-gutter flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto gap-md"
    >
      <div class="font-title-md text-title-md font-bold text-on-surface">LogisticsPro</div>
      <div class="font-label-md text-label-md text-on-surface-variant">
        {{ t('footer.copyright') }}
      </div>
      <div class="flex gap-lg font-label-md text-label-md">
        <a
          v-for="link in links"
          :key="link.key"
          href="#"
          class="text-on-surface-variant hover:text-primary transition-colors"
        >{{ t(link.key) }}</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()

const links = [
  { key: 'footer.privacy' },
  { key: 'footer.terms' },
  { key: 'footer.support' }
]
</script>
