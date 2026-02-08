<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/budget'" />
      <h1 class="text-h4 ml-4">Создание бюджета</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.period"
            label="Period"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.category"
            label="Категория"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.type"
            label="Тип"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.plannedAmount"
            label="PlannedAmount"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.actualAmount"
            label="ActualAmount"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.variance"
            label="Variance"
            type="number"
            variant="outlined"
          />
          <v-textarea
            v-model="form.notes"
            label="Примечания"
            variant="outlined"
            rows="3"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/budget'" class="mr-2">
              Отмена
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="loading"
            >
              Создать
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})


const { success, error: showError } = useSnackbar()
const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(false)

const form = ref({
  period: '',
  category: '',
  type: '',
  plannedAmount: 0,
  actualAmount: 0,
  variance: 0,
  notes: ''
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/budgets', form.value)
    success('Бюджет создан')
    router.push('/budget')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
