<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/taxrecord'" />
      <h1 class="text-h4 ml-4">Create TaxRecord</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.period"
            label="Period"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.taxType"
            label="TaxType"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.taxBase"
            label="TaxBase"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.taxRate"
            label="TaxRate"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.taxAmount"
            label="TaxAmount"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Status"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.filingDate"
            label="FilingDate"
            type="date"
            variant="outlined"
          />
          <v-textarea
            v-model="form.notes"
            label="Notes"
            variant="outlined"
            rows="3"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/taxrecord'" class="mr-2">
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
  period: '',
  taxType: '',
  taxBase: 0,
  taxRate: 0,
  taxAmount: 0,
  status: '',
  filingDate: '',
  notes: ''
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/taxrecords', form.value)
    router.push('/taxrecord')
  } catch (error) {
    console.error('Failed to create taxrecord:', error)
  } finally {
    loading.value = false
  }
}
</script>
