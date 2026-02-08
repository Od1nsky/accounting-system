<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/repository'" />
      <h1 class="text-h4 ml-4">Редактирование репозитория</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
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
          <v-text-field
            v-model="form.url"
            label="Url"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.provider"
            label="Provider"
            type="text"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.isPrivate"
            label="IsPrivate"
          />
          <v-text-field
            v-model="form.language"
            label="Language"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.lastCommit"
            label="LastCommit"
            type="datetime-local"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
            type="text"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/repository'" class="mr-2">
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

const projectOptions = useRelationOptions('/api/projects')
const form = ref({
  projectId: null as number | null,
  name: '',
  url: '',
  provider: '',
  isPrivate: false,
  language: '',
  lastCommit: '',
  status: ''
})

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/repositories/${route.params.id}`)
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
    await api.put(`/api/repositories/${route.params.id}`, form.value)
    success('Репозиторий обновлён')
    router.push('/repository')
  } catch (error) {
    showError('Не удалось обновить запись')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  projectOptions.fetchOptions()
  fetchItem()
})
</script>
