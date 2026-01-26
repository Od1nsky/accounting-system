<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/cashoperation'" />
      <h1 class="text-h4 ml-4">Create CashOperation</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.date"
            label="Date"
            type="datetime-local"
            variant="outlined"
          />
          <v-text-field
            v-model="form.type"
            label="Type"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.amount"
            label="Amount"
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
            v-model="form.purpose"
            label="Purpose"
            variant="outlined"
            rows="3"
          />
          <v-text-field
            v-model="form.counterpartyId"
            label="CounterpartyId"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.employeeId"
            label="EmployeeId"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.documentNumber"
            label="DocumentNumber"
            type="text"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/cashoperation'" class="mr-2">
              Cancel
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="loading"
            >
              Create
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

const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(false)

const form = ref({
  date: '',
  type: '',
  amount: 0,
  currency: '',
  purpose: '',
  counterpartyId: 0,
  employeeId: 0,
  documentNumber: ''
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/cashoperations', form.value)
    router.push('/cashoperation')
  } catch (error) {
    console.error('Failed to create cashoperation:', error)
  } finally {
    loading.value = false
  }
}
</script>
