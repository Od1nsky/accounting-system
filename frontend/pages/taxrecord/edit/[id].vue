<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/taxrecord'" />
      <h1 class="text-h4 ml-4">Редактирование налоговой записи</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.period"
            label="Period"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.taxType"
            label="Тип налога"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.taxBase"
            label="Налоговая база"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.taxRate"
            label="Ставка налога"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.taxAmount"
            label="Сумма налога"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.filingDate"
            label="Дата подачи"
            type="date"
            variant="outlined"
          />
          <v-textarea
            v-model="form.notes"
            label="Примечания"
            variant="outlined"
            rows="3"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/taxrecord'" class="mr-2">
              Отмена
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="submitting"
            >
              Сохранить
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card v-else>
      <v-card-text class="text-center py-8">
        <v-progress-circular indeterminate color="primary" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})


const { success, error: showError } = useSnackbar()
const route = useRoute()
const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(true)
const submitting = ref(false)

const form = ref({
  period: '',
  taxType: '',
  taxBase: 0,
  taxRate: 0,
  taxAmount: 0,
  status: '',
  filingDate: '',
  notes: ''
})

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/tax-records/${route.params.id}`)
    form.value = response.data
  } catch (error) {
    showError('Не удалось загрузить данные')
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  submitting.value = true
  try {
    await api.put(`/api/tax-records/${route.params.id}`, form.value)
    success('Налоговая запись обновлена')
    router.push('/taxrecord')
  } catch (error) {
    showError('Не удалось обновить запись')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchItem()
})
</script>
