<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/projectexpense'" />
      <h1 class="text-h4 ml-4">Create ProjectExpense</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.projectId"
            label="ProjectId"
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
            v-model="form.category"
            label="Category"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.amount"
            label="Amount"
            type="number"
            variant="outlined"
          />
          <v-textarea
            v-model="form.description"
            label="Description"
            variant="outlined"
            rows="3"
          />
          <v-text-field
            v-model="form.receipt"
            label="Receipt"
            type="text"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.approved"
            label="Approved"
          />
          <v-checkbox
            v-model="form.reimbursable"
            label="Reimbursable"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/projectexpense'" class="mr-2">
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
  projectId: 0,
  date: '',
  category: '',
  amount: 0,
  description: '',
  receipt: '',
  approved: false,
  reimbursable: false
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/projectexpenses', form.value)
    router.push('/projectexpense')
  } catch (error) {
    console.error('Failed to create projectexpense:', error)
  } finally {
    loading.value = false
  }
}
</script>
