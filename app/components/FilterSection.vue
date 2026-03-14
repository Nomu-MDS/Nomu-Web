<template>
  <div class="border-b border-[#465E8A]/8">
    <button
      class="flex items-center justify-between w-full py-3.5 bg-transparent border-none cursor-pointer text-[#465E8A]"
      @click="open = !open"
    >
      <span class="flex items-center gap-2 font-[roca] font-bold text-sm">
        {{ title }}
        <span
          v-if="count"
          class="bg-[#465E8A] text-white font-mono text-[0.65rem] font-bold px-2 py-px rounded-full min-w-[1.2rem] text-center"
        >
          {{ count }}
        </span>
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-4 h-4 opacity-50 transition-transform duration-200"
        :class="{ 'rotate-180': open }"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
    <Transition name="filter-expand">
      <div v-show="open" class="pb-3.5">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  count?: number
}>(), { count: 0 })

const open = defineModel<boolean>('open', { default: true })
</script>

<style scoped>
.filter-expand-enter-active,
.filter-expand-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}
.filter-expand-enter-from,
.filter-expand-leave-to {
  opacity: 0;
  max-height: 0;
  padding-bottom: 0;
}
.filter-expand-enter-to,
.filter-expand-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
