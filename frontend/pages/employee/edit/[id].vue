<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/employee'" />
      <h1 class="text-h4 ml-4">Edit Employee</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.firstName"
            label="FirstName"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.lastName"
            label="LastName"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.middleName"
            label="MiddleName"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.position"
            label="Position"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.department"
            label="Department"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.hireDate"
            label="HireDate"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.salary"
            label="Salary"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.phone"
            label="Phone"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.email"
            label="Email"
            type="text"
            variant="outlined"
          />
          <v-textarea
            v-model="form.passportData"
            label="PassportData"
            variant="outlined"
            rows="3"
          />
          <v-checkbox
            v-model="form.isActive"
            label="IsActive"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/employee'" class="mr-2">
              Cancel
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="submitting"
            >
              Update
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

const route = useRoute()
const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(true)
const submitting = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  position: '',
  department: '',
  hireDate: '',
  salary: 0,
  phone: '',
  email: '',
  passportData: '',
  isActive: false
})

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/employees/${route.params.id}`)
    form.value = response.data
  } catch (error) {
    console.error('Failed to fetch item:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  submitting.value = true
  try {
    await api.put(`/api/employees/${route.params.id}`, form.value)
    router.push('/employee')
  } catch (error) {
    console.error('Failed to update employee:', error)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchItem()
})
</script>
