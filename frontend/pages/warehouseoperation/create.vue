<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/warehouseoperation'" />
      <h1 class="text-h4 ml-4">Create WarehouseOperation</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.date"
            label="Date"
            type="datetime-local"
            variant="outlined"
          />
          <v-text-field
            v-model="form.type"
            label="Type"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.productId"
            label="ProductId"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.quantity"
            label="Quantity"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.price"
            label="Price"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.warehouse"
            label="Warehouse"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.documentNumber"
            label="DocumentNumber"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.counterpartyId"
            label="CounterpartyId"
            type="number"
            variant="outlined"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/warehouseoperation'" class="mr-2">
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
  date: '',
  type: '',
  productId: 0,
  quantity: 0,
  price: 0,
  warehouse: '',
  documentNumber: '',
  counterpartyId: 0
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/warehouseoperations', form.value)
    router.push('/warehouseoperation')
  } catch (error) {
    console.error('Failed to create warehouseoperation:', error)
  } finally {
    loading.value = false
  }
}
</script>
