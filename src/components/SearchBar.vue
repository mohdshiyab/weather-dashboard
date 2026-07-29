<template>
  <form class="flex items-center gap-2 sm:gap-3" @submit.prevent="handleSubmit">
    <div
      class="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 backdrop-blur-sm transition focus-within:border-amber/60 focus-within:bg-white/[0.1]"
    >
      <SearchIcon class="h-5 w-5 shrink-0 text-cloud/60" />
      <input
        ref="inputEl"
        v-model="localValue"
        type="text"
        inputmode="search"
        autocomplete="off"
        placeholder="Search a city&hellip; e.g. Bengaluru"
        aria-label="Search city"
        class="w-full bg-transparent font-body text-[15px] text-cloud placeholder:text-cloud/40 focus:outline-none"
        @keydown.esc="localValue = ''"
      />
    </div>
    <button
      type="submit"
      :disabled="disabled"
      class="group flex shrink-0 items-center gap-2 rounded-2xl bg-amber px-5 py-3.5 font-body text-sm font-semibold text-ink shadow-soft transition hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-amber active:scale-[0.97]"
    >
      <span class="hidden sm:inline">Search</span>
      <SearchIcon class="h-4 w-4 sm:hidden" />
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import SearchIcon from '../assets/icons/SearchIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'search'])

const localValue = ref(props.modelValue)
const inputEl = ref(null)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== localValue.value) localValue.value = val
  },
)
watch(localValue, (val) => emit('update:modelValue', val))

function handleSubmit() {
  emit('search', localValue.value)
}

defineExpose({ focus: () => inputEl.value?.focus() })
</script>
