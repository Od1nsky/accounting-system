<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/inventory'" />
      <h1 class="text-h4 ml-4">Создание остатка</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.date"
            label="Дата"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.warehouse"
            label="Склад"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
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
          <v-textarea
            v-model="form.notes"
            label="Примечания"
            variant="outlined"
            rows="3"
          />
          <v-text-field
            v-model="form.completedDate"
            label="CompletedDate"
            type="date"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/inventory'" class="mr-2">
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

const employeeOptions = useRelationOptions('/api/employees')
const employeeTitle = (item: any) => {
  if (!item) return ''
  const first = item.firstName ?? item.firstname
  const last = item.lastName ?? item.lastname
  return [first, last].filter(Boolean).join(' ') || String(item.id ?? '')
}
onMounted(() => { employeeOptions.fetchOptions() })

const form = ref({
  date: '',
  warehouse: '',
  status: '',
  responsiblePersonId: null as number | null,
  notes: '',
  completedDate: ''
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    const payload = { ...form.value, responsiblePersonId: form.value.responsiblePersonId != null ? Number(form.value.responsiblePersonId) : undefined }
    await api.post('/api/inventories', payload)
    success('Запись инвентаря создана')
    router.push('/inventory')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
