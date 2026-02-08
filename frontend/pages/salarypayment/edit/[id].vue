<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/salarypayment'" />
      <h1 class="text-h4 ml-4">Редактирование выплаты зарплаты</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
                    <v-select
            v-model="form.employeeId"
            label="Сотрудник"
            variant="outlined"
            :items="employeeOptions.items"
            :item-title="employeeTitle"
            :item-value="employeeOptions.itemValue"
            :loading="employeeOptions.loading"
            clearable
          />
          <v-text-field
            v-model="form.period"
            label="Period"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.baseSalary"
            label="BaseSalary"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.bonus"
            label="Bonus"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.deduction"
            label="Deduction"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.totalAmount"
            label="TotalAmount"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.paymentDate"
            label="PaymentDate"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
            type="text"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/salarypayment'" class="mr-2">
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

const employeeOptions = useRelationOptions('/api/employees')
const employeeTitle = (item: any) => {
  if (!item) return ''
  const first = item.firstName ?? item.firstname
  const last = item.lastName ?? item.lastname
  return [first, last].filter(Boolean).join(' ') || String(item.id ?? '')
}
const form = ref({
  employeeId: null as number | null,
  period: '',
  baseSalary: 0,
  bonus: 0,
  deduction: 0,
  totalAmount: 0,
  paymentDate: '',
  status: ''
})

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/salary-payments/${route.params.id}`)
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
    await api.put(`/api/salary-payments/${route.params.id}`, form.value)
    success('Выплата зарплаты обновлена')
    router.push('/salarypayment')
  } catch (error) {
    showError('Не удалось обновить запись')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  employeeOptions.fetchOptions()
  fetchItem()
})
</script>
