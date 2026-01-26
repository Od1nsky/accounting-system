<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/timeentry'" />
      <h1 class="text-h4 ml-4">Create TimeEntry</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.employeeId"
            label="EmployeeId"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.projectId"
            label="ProjectId"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.taskId"
            label="TaskId"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.date"
            label="Date"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.hours"
            label="Hours"
            type="number"
            variant="outlined"
          />
          <v-textarea
            v-model="form.description"
            label="Description"
            variant="outlined"
            rows="3"
          />
          <v-checkbox
            v-model="form.billable"
            label="Billable"
          />
          <v-text-field
            v-model="form.hourlyRate"
            label="HourlyRate"
            type="number"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.approved"
            label="Approved"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/timeentry'" class="mr-2">
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
  employeeId: 0,
  projectId: 0,
  taskId: 0,
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
    await api.post('/api/timeentrys', form.value)
    router.push('/timeentry')
  } catch (error) {
    console.error('Failed to create timeentry:', error)
  } finally {
    loading.value = false
  }
}
</script>
