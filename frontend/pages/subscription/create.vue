<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/subscription'" />
      <h1 class="text-h4 ml-4">Создание подписки</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.name"
            label="Название"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.provider"
            label="Provider"
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
            v-model="form.cost"
            label="Стоимость"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.billingPeriod"
            label="BillingPeriod"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.startDate"
            label="StartDate"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.endDate"
            label="EndDate"
            type="date"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.autoRenew"
            label="AutoRenew"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
            type="text"
            variant="outlined"
          />
          <v-textarea
            v-model="form.description"
            label="Описание"
            variant="outlined"
            rows="3"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/subscription'" class="mr-2">
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
  name: '',
  provider: '',
  type: '',
  cost: 0,
  billingPeriod: '',
  startDate: '',
  endDate: '',
  autoRenew: false,
  status: '',
  description: ''
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/subscriptions', form.value)
    success('Подписка создана')
    router.push('/subscription')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
