<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/inventory'" />
      <h1 class="text-h4 ml-4">Редактирование остатка</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
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
            :items="responsiblePersonOptions.items"
            :item-title="employeeTitle"
            :item-value="responsiblePersonOptions.itemValue"
            :loading="responsiblePersonOptions.loading"
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

const responsiblePersonOptions = useRelationOptions('/api/employees')
const employeeTitle = (item: any) => {
  if (!item) return ''
  const first = item.firstName ?? item.firstname
  const last = item.lastName ?? item.lastname
  return [first, last].filter(Boolean).join(' ') || String(item.id ?? '')
}
const form = ref({
  date: '',
  warehouse: '',
  status: '',
  responsiblePersonId: null as number | null,
  notes: '',
  completedDate: ''
})

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/inventories/${route.params.id}`)
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
    await api.put(`/api/inventories/${route.params.id}`, form.value)
    success('Запись инвентаря обновлена')
    router.push('/inventory')
  } catch (error) {
    showError('Не удалось обновить запись')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  responsiblePersonOptions.fetchOptions()
  fetchItem()
})
</script>
