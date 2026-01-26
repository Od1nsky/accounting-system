<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/client'" />
      <h1 class="text-h4 ml-4">Create Client</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.name"
            label="Name"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.contactPerson"
            label="ContactPerson"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.email"
            label="Email"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.phone"
            label="Phone"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.company"
            label="Company"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.website"
            label="Website"
            type="text"
            variant="outlined"
          />
          <v-textarea
            v-model="form.address"
            label="Address"
            variant="outlined"
            rows="3"
          />
          <v-text-field
            v-model="form.inn"
            label="Inn"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.contractNumber"
            label="ContractNumber"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Status"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.industryType"
            label="IndustryType"
            type="text"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.isActive"
            label="IsActive"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/client'" class="mr-2">
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
  name: '',
  contactPerson: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  address: '',
  inn: '',
  contractNumber: '',
  status: '',
  industryType: '',
  isActive: false
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/clients', form.value)
    router.push('/client')
  } catch (error) {
    console.error('Failed to create client:', error)
  } finally {
    loading.value = false
  }
}
</script>
