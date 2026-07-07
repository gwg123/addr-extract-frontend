<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-surface-container-lowest rounded-xl p-xl shadow-lg flex flex-col items-center gap-md">
      <div class="relative w-12 h-12">
        <div
          class="absolute inset-0 border-4 border-primary-container/30 rounded-full"
        ></div>
        <div
          class="absolute inset-0 border-4 border-primary-container border-t-transparent rounded-full animate-spin"
        ></div>
      </div>
      <p class="font-body-md text-body-md text-on-surface">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ 
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: '处理中...'
  }
})
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>