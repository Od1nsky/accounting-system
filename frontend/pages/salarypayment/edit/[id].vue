<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/salarypayment'" />
      <h1 class="text-h4 ml-4">Edit SalaryPayment</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.employeeId"
            label="EmployeeId"
            type="number"
            variant="outlined"
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
            label="Status"
            type="text"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/salarypayment'" class="mr-2">
              Cancel
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="submitting"
            >
              Update
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

const route = useRoute()
const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(true)
const submitting = ref(false)

const form = ref({
  employeeId: 0,
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
    const response = await api.get(`/api/salarypayments/${route.params.id}`)
    form.value = response.data
  } catch (error) {
    console.error('Failed to fetch item:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  submitting.value = true
  try {
    await api.put(`/api/salarypayments/${route.params.id}`, form.value)
    router.push('/salarypayment')
  } catch (error) {
    console.error('Failed to update salarypayment:', error)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchItem()
})
</script>
