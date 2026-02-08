<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/invoice'" />
      <h1 class="text-h4 ml-4">Создание накладной</h1>
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
            v-model="form.counterpartyId"
            label="Контрагент"
            variant="outlined"
            :items="counterpartyOptions.items"
            :item-title="counterpartyOptions.itemTitle"
            :item-value="counterpartyOptions.itemValue"
            :loading="counterpartyOptions.loading"
            clearable
          />
          <v-select
            v-model="form.contractId"
            label="Договор"
            variant="outlined"
            :items="contractOptions.items"
            :item-title="contractOptions.itemTitle"
            :item-value="contractOptions.itemValue"
            :loading="contractOptions.loading"
            clearable
          />
          <v-text-field
            v-model="form.date"
            label="Дата"
            type="date"
            variant="outlined"
            :rules="[dateSensibleRule]"
          />
          <v-text-field
            v-model="form.dueDate"
            label="Срок оплаты"
            type="date"
            variant="outlined"
            :rules="[dateSensibleRule]"
          />
          <v-text-field
            v-model="form.totalAmount"
            label="TotalAmount"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.vatAmount"
            label="VatAmount"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
            type="text"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.paid"
            label="Paid"
          />
          <v-text-field
            v-model="form.paidDate"
            label="Дата оплаты"
            type="date"
            variant="outlined"
            :rules="[dateNotFutureRule]"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/invoice'" class="mr-2">
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
import { dateSensibleRule, dateNotFutureRule } from '~/utils/validation'

definePageMeta({
  middleware: 'auth'
})


const { success, error: showError } = useSnackbar()
const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(false)

const counterpartyOptions = useRelationOptions('/api/counterparties')
const contractOptions = useRelationOptions('/api/contracts', { titleKey: 'number' })
onMounted(() => {
  counterpartyOptions.fetchOptions()
  contractOptions.fetchOptions()
})

const form = ref({
  number: '',
  counterpartyId: null as number | null,
  contractId: null as number | null,
  date: '',
  dueDate: '',
  totalAmount: 0,
  vatAmount: 0,
  status: '',
  paid: false,
  paidDate: ''
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    const payload = {
      ...form.value,
      counterpartyId: Number(form.value.counterpartyId) || 0,
      contractId: Number(form.value.contractId) || 0
    }
    await api.post('/api/invoices', payload)
    success('Счёт-фактура создан')
    router.push('/invoice')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
