<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/reconciliation'" />
      <h1 class="text-h4 ml-4">Create Reconciliation</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.counterpartyId"
            label="CounterpartyId"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.startDate"
            label="StartDate"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.endDate"
            label="EndDate"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.ourBalance"
            label="OurBalance"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.theirBalance"
            label="TheirBalance"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.difference"
            label="Difference"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Status"
            type="text"
            variant="outlined"
          />
          <v-textarea
            v-model="form.notes"
            label="Notes"
            variant="outlined"
            rows="3"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/reconciliation'" class="mr-2">
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
  counterpartyId: 0,
  startDate: '',
  endDate: '',
  ourBalance: 0,
  theirBalance: 0,
  difference: 0,
  status: '',
  notes: ''
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/reconciliations', form.value)
    router.push('/reconciliation')
  } catch (error) {
    console.error('Failed to create reconciliation:', error)
  } finally {
    loading.value = false
  }
}
</script>
