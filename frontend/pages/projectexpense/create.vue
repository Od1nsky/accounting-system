<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/projectexpense'" />
      <h1 class="text-h4 ml-4">Создание расхода по проекту</h1>
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
            v-model="form.date"
            label="Дата"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.category"
            label="Категория"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.amount"
            label="Сумма"
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
            v-model="form.receipt"
            label="Receipt"
            type="text"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.approved"
            label="Согласовано"
          />
          <v-checkbox
            v-model="form.reimbursable"
            label="Reimbursable"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/projectexpense'" class="mr-2">
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
  date: '',
  category: '',
  amount: 0,
  description: '',
  receipt: '',
  approved: false,
  reimbursable: false
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    const payload = { ...form.value, projectId: Number(form.value.projectId) || 0 }
    await api.post('/api/project-expenses', payload)
    success('Расход по проекту создан')
    router.push('/projectexpense')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
