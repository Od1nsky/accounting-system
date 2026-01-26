<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/repository'" />
      <h1 class="text-h4 ml-4">Create Repository</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.projectId"
            label="ProjectId"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.name"
            label="Name"
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
            label="Status"
            type="text"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/repository'" class="mr-2">
              Cancel
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="loading"
            >
              Create
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

const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(false)

const form = ref({
  projectId: 0,
  name: '',
  url: '',
  provider: '',
  isPrivate: false,
  language: '',
  lastCommit: '',
  status: ''
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/repositorys', form.value)
    router.push('/repository')
  } catch (error) {
    console.error('Failed to create repository:', error)
  } finally {
    loading.value = false
  }
}
</script>
