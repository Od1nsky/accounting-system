<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/warehouseoperation'" />
      <h1 class="text-h4 ml-4">Редактирование складской операции</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
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
            label="Продукт"
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
              :loading="submitting"
            >
              Сохранить
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


const { success, error: showError } = useSnackbar()
const route = useRoute()
const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(true)
const submitting = ref(false)

const productOptions = useRelationOptions('/api/products')
const counterpartyOptions = useRelationOptions('/api/counterparties')
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

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/warehouse-operations/${route.params.id}`)
    form.value = response.data
  } catch (error) {
    showError('Не удалось загрузить данные')
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  submitting.value = true
  try {
    await api.put(`/api/warehouse-operations/${route.params.id}`, form.value)
    success('Складская операция обновлена')
    router.push('/warehouseoperation')
  } catch (error) {
    showError('Не удалось обновить запись')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  productOptions.fetchOptions()
  counterpartyOptions.fetchOptions()
  fetchItem()
})
</script>
