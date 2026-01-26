<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/payment'" />
      <h1 class="text-h4 ml-4">Create Payment</h1>
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
            v-model="form.invoiceId"
            label="InvoiceId"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.counterpartyId"
            label="CounterpartyId"
            type="number"
            variant="outlined"
          />
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
            v-model="form.method"
            label="Method"
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
            v-model="form.description"
            label="Description"
            variant="outlined"
            rows="3"
          />
          <v-text-field
            v-model="form.status"
            label="Status"
            type="text"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/payment'" class="mr-2">
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
  invoiceId: 0,
  counterpartyId: 0,
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
    await api.post('/api/payments', form.value)
    router.push('/payment')
  } catch (error) {
    console.error('Failed to create payment:', error)
  } finally {
    loading.value = false
  }
}
</script>
