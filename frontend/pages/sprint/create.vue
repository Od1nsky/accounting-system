<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/sprint'" />
      <h1 class="text-h4 ml-4">Create Sprint</h1>
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
          <v-textarea
            v-model="form.goal"
            label="Goal"
            variant="outlined"
            rows="3"
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
            v-model="form.status"
            label="Status"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.velocity"
            label="Velocity"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.capacity"
            label="Capacity"
            type="number"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/sprint'" class="mr-2">
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
  goal: '',
  startDate: '',
  endDate: '',
  status: '',
  velocity: 0,
  capacity: 0
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/sprints', form.value)
    router.push('/sprint')
  } catch (error) {
    console.error('Failed to create sprint:', error)
  } finally {
    loading.value = false
  }
}
</script>
