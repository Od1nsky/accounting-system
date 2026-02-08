<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/reconciliation'" />
      <h1 class="text-h4 ml-4">Редактирование сверки</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
                    <v-select
            v-model="form.counterpartyId"
            label="Контрагент"
            variant="outlined"
            :items="counterpartyOptions.items"
            :item-title="counterpartyOptions.itemTitle"
            :item-value="counterpartyOptions.itemValue"
            :loading="counterpartyOptions.loading"
            clearable
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
            label="Статус"
            type="text"
            variant="outlined"
          />
          <v-textarea
            v-model="form.notes"
            label="Примечания"
            variant="outlined"
            rows="3"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/reconciliation'" class="mr-2">
              Отмена
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="submitting"
            >
              Сохранить
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


const { success, error: showError } = useSnackbar()
const route = useRoute()
const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(true)
const submitting = ref(false)

const counterpartyOptions = useRelationOptions('/api/counterparties')
const form = ref({
  counterpartyId: null as number | null,
  startDate: '',
  endDate: '',
  ourBalance: 0,
  theirBalance: 0,
  difference: 0,
  status: '',
  notes: ''
})

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/reconciliations/${route.params.id}`)
    form.value = response.data
  } catch (error) {
    showError('Не удалось загрузить данные')
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  submitting.value = true
  try {
    await api.put(`/api/reconciliations/${route.params.id}`, form.value)
    success('Сверка обновлена')
    router.push('/reconciliation')
  } catch (error) {
    showError('Не удалось обновить запись')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  counterpartyOptions.fetchOptions()
  fetchItem()
})
</script>
