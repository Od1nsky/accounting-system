<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/product'" />
      <h1 class="text-h4 ml-4">Редактирование товара</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.code"
            label="Код"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.name"
            label="Название"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.type"
            label="Тип"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.unit"
            label="Ед. изм."
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.price"
            label="Цена"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.cost"
            label="Стоимость"
            type="number"
            variant="outlined"
          />
          <v-text-field
            v-model="form.vatRate"
            label="Ставка НДС"
            type="number"
            variant="outlined"
          />
          <v-textarea
            v-model="form.description"
            label="Описание"
            variant="outlined"
            rows="3"
          />
          <v-checkbox
            v-model="form.isActive"
            label="Активен"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/product'" class="mr-2">
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

const form = ref({
  code: '',
  name: '',
  type: '',
  unit: '',
  price: 0,
  cost: 0,
  vatRate: 0,
  description: '',
  isActive: false
})

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/products/${route.params.id}`)
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
    await api.put(`/api/products/${route.params.id}`, form.value)
    success('Продукт обновлён')
    router.push('/product')
  } catch (error) {
    showError('Не удалось обновить запись')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchItem()
})
</script>
