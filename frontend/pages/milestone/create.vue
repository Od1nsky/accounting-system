<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/milestone'" />
      <h1 class="text-h4 ml-4">Create Milestone</h1>
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
            v-model="form.name"
            label="Name"
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
            v-model="form.dueDate"
            label="DueDate"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.completedDate"
            label="CompletedDate"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Status"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.paymentAmount"
            label="PaymentAmount"
            type="number"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.paid"
            label="Paid"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/milestone'" class="mr-2">
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
  name: '',
  description: '',
  dueDate: '',
  completedDate: '',
  status: '',
  paymentAmount: 0,
  paid: false
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/milestones', form.value)
    router.push('/milestone')
  } catch (error) {
    console.error('Failed to create milestone:', error)
  } finally {
    loading.value = false
  }
}
</script>
