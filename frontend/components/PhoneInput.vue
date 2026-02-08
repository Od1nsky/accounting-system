<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    label="Телефон"
    type="tel"
    variant="outlined"
    v-maska:[phoneMaskOptions]
    placeholder="+7 (___) ___-__-__"
    :rules="rules"
  />
</template>

<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { phoneRule } from '~/utils/validation'

defineProps<{
  modelValue: string
  rules?: ((v: string) => true | string)[]
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const phoneMaskOptions = {
  mask: '+# (###) ###-##-##',
  eager: true,
}
</script>
