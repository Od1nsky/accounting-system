<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/counterparty'" />
      <h1 class="text-h4 ml-4">Create Counterparty</h1>
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
            v-model="form.type"
            label="Type"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.inn"
            label="Inn"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.kpp"
            label="Kpp"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.ogrn"
            label="Ogrn"
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
          <v-text-field
            v-model="form.bankAccount"
            label="BankAccount"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.bankName"
            label="BankName"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.bik"
            label="Bik"
            type="text"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.isActive"
            label="IsActive"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/counterparty'" class="mr-2">
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
  type: '',
  inn: '',
  kpp: '',
  ogrn: '',
  address: '',
  phone: '',
  email: '',
  bankAccount: '',
  bankName: '',
  bik: '',
  isActive: false
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/counterpartys', form.value)
    router.push('/counterparty')
  } catch (error) {
    console.error('Failed to create counterparty:', error)
  } finally {
    loading.value = false
  }
}
</script>
