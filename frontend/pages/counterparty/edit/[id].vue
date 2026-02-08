<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/counterparty'" />
      <h1 class="text-h4 ml-4">Редактирование контрагента</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
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
            v-model="form.inn"
            label="ИНН"
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
            label="Адрес"
            variant="outlined"
            rows="3"
          />
                    <PhoneInput v-model="form.phone" :rules="[phoneRule]" />
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
            label="Активен"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/counterparty'" class="mr-2">
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
import { phoneRule } from '~/utils/validation'

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
    const response = await api.get(`/api/counterparties/${route.params.id}`)
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
    await api.put(`/api/counterparties/${route.params.id}`, form.value)
    success('Контрагент обновлён')
    router.push('/counterparty')
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
