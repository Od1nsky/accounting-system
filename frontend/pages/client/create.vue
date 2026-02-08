<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/client'" />
      <h1 class="text-h4 ml-4">Создание клиента</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.name"
            label="Название"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.contactPerson"
            label="Контактное лицо"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.email"
            label="Email"
            type="text"
            variant="outlined"
          />
                    <PhoneInput v-model="form.phone" :rules="[phoneRule]" />
          <v-text-field
            v-model="form.company"
            label="Компания"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.website"
            label="Веб-сайт"
            type="text"
            variant="outlined"
          />
          <v-textarea
            v-model="form.address"
            label="Адрес"
            variant="outlined"
            rows="3"
          />
          <v-text-field
            v-model="form.inn"
            label="ИНН"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.contractNumber"
            label="Номер договора"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.status"
            label="Статус"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.industryType"
            label="Отрасль"
            type="text"
            variant="outlined"
          />
          <v-checkbox
            v-model="form.isActive"
            label="Активен"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/client'" class="mr-2">
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
import { phoneRule } from '~/utils/validation'

definePageMeta({
  middleware: 'auth'
})


const { success, error: showError } = useSnackbar()
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
    success('Клиент создан')
    router.push('/client')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
