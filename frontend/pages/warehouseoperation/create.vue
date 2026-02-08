<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/warehouseoperation'" />
      <h1 class="text-h4 ml-4">Создание складской операции</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.date"
            label="Дата"
            type="datetime-local"
            variant="outlined"
          />
          <v-text-field
            v-model="form.type"
            label="Тип"
            type="text"
            variant="outlined"
          />
          <v-select
            v-model="form.productId"
            label="Товар"
            variant="outlined"
            :items="productOptions.items"
            :item-title="productOptions.itemTitle"
            :item-value="productOptions.itemValue"
            :loading="productOptions.loading"
            clearable
          />
          <v-text-field
            v-model="form.quantity"
            label="Количество"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.price"
            label="Цена"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.warehouse"
            label="Склад"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.documentNumber"
            label="Номер документа"
            type="text"
            variant="outlined"
          />
          <v-select
            v-model="form.counterpartyId"
            label="Контрагент"
            variant="outlined"
            :items="counterpartyOptions.items"
            :item-title="counterpartyOptions.itemTitle"
            :item-value="counterpartyOptions.itemValue"
            :loading="counterpartyOptions.loading"
            clearable
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/warehouseoperation'" class="mr-2">
              Отмена
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="loading"
            >
              Создать
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


const { success, error: showError } = useSnackbar()
const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(false)

const productOptions = useRelationOptions('/api/products')
const counterpartyOptions = useRelationOptions('/api/counterparties')
onMounted(() => {
  productOptions.fetchOptions()
  counterpartyOptions.fetchOptions()
})

const form = ref({
  date: '',
  type: '',
  productId: null as number | null,
  quantity: 0,
  price: 0,
  warehouse: '',
  documentNumber: '',
  counterpartyId: null as number | null
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    const payload = {
      ...form.value,
      productId: Number(form.value.productId) || 0,
      counterpartyId: Number(form.value.counterpartyId) || 0
    }
    await api.post('/api/warehouse-operations', payload)
    success('Складская операция создана')
    router.push('/warehouseoperation')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
