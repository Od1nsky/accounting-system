<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/milestone'" />
      <h1 class="text-h4 ml-4">Создание этапа</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
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
          <v-text-field
            v-model="form.name"
            label="Название"
            type="text"
            variant="outlined"
          />
          <v-textarea
            v-model="form.description"
            label="Описание"
            variant="outlined"
            rows="3"
          />
          <v-text-field
            v-model="form.dueDate"
            label="DueDate"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.completedDate"
            label="CompletedDate"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.paymentAmount"
            label="PaymentAmount"
            type="number"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.paid"
            label="Paid"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/milestone'" class="mr-2">
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

const projectOptions = useRelationOptions('/api/projects')
onMounted(() => { projectOptions.fetchOptions() })

const form = ref({
  projectId: null as number | null,
  name: '',
  description: '',
  dueDate: '',
  completedDate: '',
  status: '',
  paymentAmount: 0,
  paid: false
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    const payload = { ...form.value, projectId: Number(form.value.projectId) || 0 }
    await api.post('/api/milestones', payload)
    success('Веха создана')
    router.push('/milestone')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
