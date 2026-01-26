<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/invoice'" />
      <h1 class="text-h4 ml-4">Create Invoice</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.number"
            label="Number"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.counterpartyId"
            label="CounterpartyId"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.contractId"
            label="ContractId"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.date"
            label="Date"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.dueDate"
            label="DueDate"
            type="date"
            variant="outlined"
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
            label="Status"
            type="text"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.paid"
            label="Paid"
          />
          <v-text-field
            v-model="form.paidDate"
            label="PaidDate"
            type="date"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/invoice'" class="mr-2">
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
  number: '',
  counterpartyId: 0,
  contractId: 0,
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
    await api.post('/api/invoices', form.value)
    router.push('/invoice')
  } catch (error) {
    console.error('Failed to create invoice:', error)
  } finally {
    loading.value = false
  }
}
</script>
