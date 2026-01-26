<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/asset'" />
      <h1 class="text-h4 ml-4">Edit Asset</h1>
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
            v-model="form.inventoryNumber"
            label="InventoryNumber"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.category"
            label="Category"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.cost"
            label="Cost"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.purchaseDate"
            label="PurchaseDate"
            type="date"
            variant="outlined"
          />
          <v-text-field
            v-model="form.depreciationRate"
            label="DepreciationRate"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.residualValue"
            label="ResidualValue"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Status"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.location"
            label="Location"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.responsiblePersonId"
            label="ResponsiblePersonId"
            type="number"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/asset'" class="mr-2">
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
  inventoryNumber: '',
  category: '',
  cost: 0,
  purchaseDate: '',
  depreciationRate: 0,
  residualValue: 0,
  status: '',
  location: '',
  responsiblePersonId: 0
})

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/assets/${route.params.id}`)
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
    await api.put(`/api/assets/${route.params.id}`, form.value)
    router.push('/asset')
  } catch (error) {
    console.error('Failed to update asset:', error)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchItem()
})
</script>
