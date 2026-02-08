<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/timeentry'" />
      <h1 class="text-h4 ml-4">Создание учёта времени</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-select
            v-model="form.employeeId"
            label="Сотрудник"
            variant="outlined"
            :items="employeeOptions.items"
            :item-title="employeeTitle"
            :item-value="employeeOptions.itemValue"
            :loading="employeeOptions.loading"
            clearable
          />
          <v-select
            v-model="form.projectId"
            label="Проект"
            variant="outlined"
            :items="projectOptions.items"
            :item-title="projectOptions.itemTitle"
            :item-value="projectOptions.itemValue"
            :loading="projectOptions.loading"
            clearable
          />
          <v-select
            v-model="form.taskId"
            label="Задача"
            variant="outlined"
            :items="taskOptions.items"
            :item-title="taskOptions.itemTitle"
            :item-value="taskOptions.itemValue"
            :loading="taskOptions.loading"
            clearable
          />
          <v-text-field
            v-model="form.date"
            label="Дата"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.hours"
            label="Часы"
            type="number"
            variant="outlined"
          />
          <v-textarea
            v-model="form.description"
            label="Описание"
            variant="outlined"
            rows="3"
          />
          <v-checkbox
            v-model="form.billable"
            label="Оплачиваемый"
          />
          <v-text-field
            v-model="form.hourlyRate"
            label="Ставка в час"
            type="number"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.approved"
            label="Согласовано"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/timeentry'" class="mr-2">
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
const projectOptions = useRelationOptions('/api/projects')
const taskOptions = useRelationOptions('/api/tasks', { titleKey: 'title' })
const employeeTitle = (item: any) => {
  if (!item) return ''
  const first = item.firstName ?? item.firstname
  const last = item.lastName ?? item.lastname
  return [first, last].filter(Boolean).join(' ') || String(item.id ?? '')
}
onMounted(() => {
  employeeOptions.fetchOptions()
  projectOptions.fetchOptions()
  taskOptions.fetchOptions()
})

const form = ref({
  employeeId: null as number | null,
  projectId: null as number | null,
  taskId: null as number | null,
  date: '',
  hours: 0,
  description: '',
  billable: false,
  hourlyRate: 0,
  approved: false
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    const payload = {
      ...form.value,
      employeeId: Number(form.value.employeeId) || 0,
      projectId: Number(form.value.projectId) || 0,
      taskId: Number(form.value.taskId) || 0
    }
    await api.post('/api/time-entries', payload)
    success('Запись времени создана')
    router.push('/timeentry')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
