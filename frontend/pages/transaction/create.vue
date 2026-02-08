<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/transaction'" />
      <h1 class="text-h4 ml-4">Создание транзакции</h1>
    </div>

    <v-card max-width="800">
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
  date: '',
  debitAccount: '',
  creditAccount: '',
  amount: 0,
  description: '',
  documentNumber: '',
  documentType: '',
  posted: false
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/transactions', form.value)
    success('Транзакция создана')
    router.push('/transaction')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
