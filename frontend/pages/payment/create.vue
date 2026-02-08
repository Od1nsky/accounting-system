<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/payment'" />
      <h1 class="text-h4 ml-4">Создание платежа</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.number"
            label="Номер"
            type="text"
            variant="outlined"
          />
          <v-select
            v-model="form.invoiceId"
            label="Накладная"
            variant="outlined"
            :items="invoiceOptions.items"
            :item-title="invoiceOptions.itemTitle"
            :item-value="invoiceOptions.itemValue"
            :loading="invoiceOptions.loading"
            clearable
          />
          <v-select
            v-model="form.counterpartyId"
            label="Контрагент"
            variant="outlined"
            :items="counterpartyOptions.items"
            :item-title="counterpartyOptions.itemTitle"
            :item-value="counterpartyOptions.itemValue"
            :loading="counterpartyOptions.loading"
            clearable
          />
          <v-text-field
            v-model="form.date"
            label="Дата"
            type="datetime-local"
            variant="outlined"
          />
          <v-text-field
            v-model="form.type"
            label="Тип"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.method"
            label="Method"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.amount"
            label="Сумма"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.currency"
            label="Currency"
            type="text"
            variant="outlined"
          />
          <v-textarea
            v-model="form.description"
            label="Описание"
            variant="outlined"
            rows="3"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
            type="text"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/payment'" class="mr-2">
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

const invoiceOptions = useRelationOptions('/api/invoices', { titleKey: 'number' })
const counterpartyOptions = useRelationOptions('/api/counterparties')
onMounted(() => {
  invoiceOptions.fetchOptions()
  counterpartyOptions.fetchOptions()
})

const form = ref({
  number: '',
  invoiceId: null as number | null,
  counterpartyId: null as number | null,
  date: '',
  type: '',
  method: '',
  amount: 0,
  currency: '',
  description: '',
  status: ''
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    const payload = {
      ...form.value,
      invoiceId: Number(form.value.invoiceId) || 0,
      counterpartyId: Number(form.value.counterpartyId) || 0
    }
    await api.post('/api/payments', payload)
    success('Платёж создан')
    router.push('/payment')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
