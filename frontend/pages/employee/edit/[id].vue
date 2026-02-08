<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" :to="'/employee'" />
      <h1 class="text-h4 ml-4">Редактирование сотрудника</h1>
    </div>

    <v-card v-if="!loading" max-width="800">
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
import { phoneRule, dateNotFutureRule } from '~/utils/validation'

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

const fetchItem = async () => {
  loading.value = true
  try {
    const response = await api.get(`/api/employees/${route.params.id}`)
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
    await api.put(`/api/employees/${route.params.id}`, form.value)
    success('Сотрудник обновлён')
    router.push('/employee')
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
