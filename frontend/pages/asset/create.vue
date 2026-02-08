<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/asset'" />
      <h1 class="text-h4 ml-4">Создание актива</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.name"
            label="Название"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.inventoryNumber"
            label="InventoryNumber"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.category"
            label="Категория"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.cost"
            label="Стоимость"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.purchaseDate"
            label="Дата приобретения"
            type="date"
            variant="outlined"
            :rules="[dateSensibleRule]"
          />
          <v-text-field
            v-model="form.depreciationRate"
            label="DepreciationRate"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.residualValue"
            label="ResidualValue"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.location"
            label="Location"
            type="text"
            variant="outlined"
          />
          <v-select
            v-model="form.responsiblePersonId"
            label="Ответственный"
            variant="outlined"
            :items="employeeOptions.items"
            :item-title="employeeTitle"
            :item-value="employeeOptions.itemValue"
            :loading="employeeOptions.loading"
            clearable
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/asset'" class="mr-2">
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
import { dateSensibleRule } from '~/utils/validation'

definePageMeta({
  middleware: 'auth'
})


const { success, error: showError } = useSnackbar()
const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(false)

const employeeOptions = useRelationOptions('/api/employees')
const employeeTitle = (item: any) => {
  if (!item) return ''
  const first = item.firstName ?? item.firstname
  const last = item.lastName ?? item.lastname
  return [first, last].filter(Boolean).join(' ') || String(item.id ?? '')
}
onMounted(() => { employeeOptions.fetchOptions() })

const form = ref({
  name: '',
  inventoryNumber: '',
  category: '',
  cost: 0,
  purchaseDate: '',
  depreciationRate: 0,
  residualValue: 0,
  status: '',
  location: '',
  responsiblePersonId: null as number | null
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    const payload = { ...form.value, responsiblePersonId: form.value.responsiblePersonId != null ? Number(form.value.responsiblePersonId) : undefined }
    await api.post('/api/assets', payload)
    success('Актив создан')
    router.push('/asset')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
