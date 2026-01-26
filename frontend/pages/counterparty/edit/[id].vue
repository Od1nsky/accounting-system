<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/counterparty'" />
      <h1 class="text-h4 ml-4">Edit Counterparty</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
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

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/counterpartys/${route.params.id}`)
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
    await api.put(`/api/counterpartys/${route.params.id}`, form.value)
    router.push('/counterparty')
  } catch (error) {
    console.error('Failed to update counterparty:', error)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchItem()
})
</script>
