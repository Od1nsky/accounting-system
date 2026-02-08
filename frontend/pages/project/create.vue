<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/project'" />
      <h1 class="text-h4 ml-4">Создание проекта</h1>
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
          <v-select
            v-model="form.clientId"
            label="Клиент"
            variant="outlined"
            :items="clientOptions.items"
            :item-title="clientOptions.itemTitle"
            :item-value="clientOptions.itemValue"
            :loading="clientOptions.loading"
            clearable
          />
          <v-text-field
            v-model="form.code"
            label="Код"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.type"
            label="Тип"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.startDate"
            label="Дата начала"
            type="date"
            variant="outlined"
            :rules="[dateSensibleRule]"
          />
          <v-text-field
            v-model="form.endDate"
            label="Дата окончания"
            type="date"
            variant="outlined"
            :rules="[dateSensibleRule, dateEndAfterStartRule]"
          />
          <v-text-field
            v-model="form.budget"
            label="Budget"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.actualCost"
            label="ActualCost"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.hourlyRate"
            label="Ставка в час"
            type="number"
            variant="outlined"
          />
          <v-textarea
            v-model="form.description"
            label="Описание"
            variant="outlined"
            rows="3"
          />
          <v-text-field
            v-model="form.repository"
            label="Repository"
            type="text"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.isActive"
            label="Активен"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/project'" class="mr-2">
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

const clientOptions = useRelationOptions('/api/clients')
onMounted(() => { clientOptions.fetchOptions() })

const form = ref({
  name: '',
  clientId: null as number | null,
  code: '',
  type: '',
  status: '',
  startDate: '',
  endDate: '',
  budget: 0,
  actualCost: 0,
  hourlyRate: 0,
  description: '',
  repository: '',
  isActive: false
})

const dateEndAfterStartRule = (v: string) => {
  if (!v) return true
  const start = form.value.startDate
  if (!start) return true
  return new Date(v) >= new Date(start) || 'Дата окончания не может быть раньше даты начала'
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    const payload = { ...form.value, clientId: Number(form.value.clientId) || 0 }
    await api.post('/api/projects', payload)
    success('Проект создан')
    router.push('/project')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
