<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/transaction'" />
      <h1 class="text-h4 ml-4">Редактирование транзакции</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.date"
            label="Дата"
            type="datetime-local"
            variant="outlined"
          />
          <v-text-field
            v-model="form.debitAccount"
            label="Счёт дебет"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.creditAccount"
            label="Счёт кредит"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.amount"
            label="Сумма"
            type="number"
            variant="outlined"
          />
          <v-textarea
            v-model="form.description"
            label="Описание"
            variant="outlined"
            rows="3"
          />
          <v-text-field
            v-model="form.documentNumber"
            label="Номер документа"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.documentType"
            label="Тип документа"
            type="text"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.posted"
            label="Проведён"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/transaction'" class="mr-2">
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
  date: '',
  debitAccount: '',
  creditAccount: '',
  amount: 0,
  description: '',
  documentNumber: '',
  documentType: '',
  posted: false
})

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/transactions/${route.params.id}`)
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
    await api.put(`/api/transactions/${route.params.id}`, form.value)
    success('Транзакция обновлена')
    router.push('/transaction')
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
