<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/contract'" />
      <h1 class="text-h4 ml-4">Создание договора</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.number"
            label="Номер контракта"
            type="text"
            variant="outlined"
            :rules="contractRules.number"
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
            :rules="contractRules.counterpartyId"
          />
          <v-text-field
            v-model="form.type"
            label="Тип"
            type="text"
            variant="outlined"
            :rules="contractRules.type"
          />
          <v-text-field
            v-model="form.signDate"
            label="Дата подписания"
            type="date"
            variant="outlined"
            :rules="contractRules.signDate"
          />
          <v-text-field
            v-model="form.startDate"
            label="Дата начала"
            type="date"
            variant="outlined"
            :rules="contractRules.startDate"
          />
          <v-text-field
            v-model="form.endDate"
            label="Дата окончания"
            type="date"
            variant="outlined"
            :rules="contractRules.endDate"
          />
          <v-text-field
            v-model.number="form.amount"
            label="Сумма"
            type="number"
            variant="outlined"
            min="0"
            :rules="contractRules.amount"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
            type="text"
            variant="outlined"
            :rules="contractRules.status"
          />
          <v-textarea
            v-model="form.description"
            label="Описание"
            variant="outlined"
            rows="3"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/contract'" class="mr-2">
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
import { dateSensibleRule } from '~/utils/validation'

definePageMeta({
  middleware: 'auth'
})

const api = useApi()
const router = useRouter()
const { error: showError, success } = useSnackbar()
const formRef = ref<any>(null)
const loading = ref(false)

const counterpartyOptions = useRelationOptions('/api/counterparties')
onMounted(() => { counterpartyOptions.fetchOptions() })

const form = ref({
  number: '',
  counterpartyId: null as number | null,
  type: '',
  signDate: '',
  startDate: '',
  endDate: '',
  amount: 0,
  status: '',
  description: ''
})

const contractRules = {
  number: [
    (v: string) => !!v?.trim() || 'Номер контракта обязателен',
    (v: string) => !v || v.length <= 255 || 'Максимум 255 символов'
  ],
  counterpartyId: [
    (v: number | null) => (v != null && Number(v) >= 1) || 'Выберите контрагента'
  ],
  type: [
    (v: string) => !v || v.length <= 255 || 'Максимум 255 символов'
  ],
  signDate: [dateSensibleRule],
  startDate: [dateSensibleRule],
  endDate: [
    dateSensibleRule,
    (v: string) => {
      if (!v) return true
      const start = form.value.startDate
      if (!start) return true
      return new Date(v) >= new Date(start) || 'Дата окончания не может быть раньше даты начала'
    }
  ],
  amount: [
    (v: number) => v == null || (Number.isInteger(Number(v)) && Number(v) >= 0) || 'Сумма — целое число ≥ 0'
  ],
  status: [
    (v: string) => !v || v.length <= 255 || 'Максимум 255 символов'
  ]
}

function buildPayload () {
  const f = form.value
  return {
    number: f.number?.trim() || '',
    counterpartyId: Number(f.counterpartyId) || 0,
    type: f.type?.trim() || '',
    signDate: f.signDate || undefined,
    startDate: f.startDate || undefined,
    endDate: f.endDate || undefined,
    amount: Number(f.amount) || 0,
    status: f.status?.trim() || '',
    description: f.description?.trim() || ''
  }
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/contracts', buildPayload())
    success('Договор создан')
    router.push('/contract')
  } catch (err: any) {
    const details = err.response?.data?.details
    const msg = Array.isArray(details) && details[0]?.msg ? details[0].msg : (err.response?.data?.error || 'Не удалось создать договор')
    showError(typeof msg === 'string' ? msg : 'Не удалось создать договор')
  } finally {
    loading.value = false
  }
}
</script>
