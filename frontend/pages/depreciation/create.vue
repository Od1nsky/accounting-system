<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/depreciation'" />
      <h1 class="text-h4 ml-4">Создание амортизации</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-select
            v-model="form.assetId"
            label="Основное средство"
            variant="outlined"
            :items="assetOptions.items"
            :item-title="assetOptions.itemTitle"
            :item-value="assetOptions.itemValue"
            :loading="assetOptions.loading"
            clearable
          />
          <v-text-field
            v-model="form.period"
            label="Period"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.amount"
            label="Сумма"
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
            label="Проведён"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/depreciation'" class="mr-2">
              Отмена
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="loading"
            >
              Создать
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


const { success, error: showError } = useSnackbar()
const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(false)

const assetOptions = useRelationOptions('/api/assets', { titleKey: 'name' })
onMounted(() => { assetOptions.fetchOptions() })

const form = ref({
  assetId: null as number | null,
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
    const payload = { ...form.value, assetId: Number(form.value.assetId) || 0 }
    await api.post('/api/depreciations', payload)
    success('Амортизация создана')
    router.push('/depreciation')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
