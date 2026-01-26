<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/depreciation'" />
      <h1 class="text-h4 ml-4">Create Depreciation</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.assetId"
            label="AssetId"
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
            v-model="form.amount"
            label="Amount"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.accumulatedAmount"
            label="AccumulatedAmount"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.calculationDate"
            label="CalculationDate"
            type="datetime-local"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.posted"
            label="Posted"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/depreciation'" class="mr-2">
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
  assetId: 0,
  period: '',
  amount: 0,
  accumulatedAmount: 0,
  calculationDate: '',
  posted: false
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/depreciations', form.value)
    router.push('/depreciation')
  } catch (error) {
    console.error('Failed to create depreciation:', error)
  } finally {
    loading.value = false
  }
}
</script>
