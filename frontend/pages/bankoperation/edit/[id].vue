<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/bankoperation'" />
      <h1 class="text-h4 ml-4">Edit BankOperation</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
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
            v-model="form.accountNumber"
            label="AccountNumber"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.documentNumber"
            label="DocumentNumber"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Status"
            type="text"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/bankoperation'" class="mr-2">
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
  date: '',
  type: '',
  amount: 0,
  currency: '',
  purpose: '',
  counterpartyId: 0,
  accountNumber: '',
  documentNumber: '',
  status: ''
})

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/bankoperations/${route.params.id}`)
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
    await api.put(`/api/bankoperations/${route.params.id}`, form.value)
    router.push('/bankoperation')
  } catch (error) {
    console.error('Failed to update bankoperation:', error)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchItem()
})
</script>
