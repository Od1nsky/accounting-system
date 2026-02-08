<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/employee'" />
      <h1 class="text-h4 ml-4">Создание сотрудника</h1>
    </div>

    <v-card max-width="800">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.firstName"
            label="Имя"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.lastName"
            label="Фамилия"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.middleName"
            label="Отчество"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.position"
            label="Должность"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.department"
            label="Отдел"
            type="text"
            variant="outlined"
          />
          <v-text-field
            v-model="form.hireDate"
            label="Дата приёма"
            type="date"
            variant="outlined"
            :rules="[dateNotFutureRule]"
          />
          <v-text-field
            v-model="form.salary"
            label="Зарплата"
            type="number"
            variant="outlined"
          />
                    <PhoneInput v-model="form.phone" :rules="[phoneRule]" />
          <v-text-field
            v-model="form.email"
            label="Email"
            type="text"
            variant="outlined"
          />
          <v-textarea
            v-model="form.passportData"
            label="Паспорт"
            variant="outlined"
            rows="3"
          />
          <v-checkbox
            v-model="form.isActive"
            label="Активен"
          />

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" :to="'/employee'" class="mr-2">
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
import { phoneRule, dateNotFutureRule } from '~/utils/validation'

definePageMeta({
  middleware: 'auth'
})


const { success, error: showError } = useSnackbar()
const api = useApi()
const router = useRouter()
const formRef = ref<any>(null)
const loading = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  position: '',
  department: '',
  hireDate: '',
  salary: 0,
  phone: '',
  email: '',
  passportData: '',
  isActive: false
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.post('/api/employees', form.value)
    success('Сотрудник создан')
    router.push('/employee')
  } catch (error) {
    showError('Не удалось создать запись')
  } finally {
    loading.value = false
  }
}
</script>
