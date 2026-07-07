<template>
  <Transition name="toast">
    <div
      v-if="visible"
      :class="[
        'fixed top-[100px] left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 font-body-md text-body-md',
        type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
      ]"
    >
      <span
        class="material-symbols-outlined"
        style="font-variation-settings: 'FILL' 1;"
      >
        {{ type === 'error' ? 'error' : 'check_circle' }}
      </span>
      {{ message }}
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'success',
    validator: (v) => ['success', 'error'].includes(v)
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>