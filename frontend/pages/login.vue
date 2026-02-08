<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-4">
          <v-card-title class="text-h5 text-center">
            Вход
          </v-card-title>
          <v-card-text>
            <v-alert v-if="error" type="error" class="mb-4" closable @click:close="error = ''">
              {{ error }}
            </v-alert>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                class="mb-2"
                :error-messages="errors.email"
              />
              <v-text-field
                v-model="form.password"
                label="Пароль"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                variant="outlined"
                class="mb-4"
                :error-messages="errors.password"
                @click:append-inner="showPassword = !showPassword"
              />
              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
              >
                Войти
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <span>Нет аккаунта?</span>
            <v-btn variant="text" color="primary" to="/register">
              Зарегистрироваться
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: (to, from) => {
    const { isAuthenticated } = useAuth()
    if (isAuthenticated.value) {
      return navigateTo('/')
    }
  }
})

const form = ref({
  email: '',
  password: ''
})
const errors = ref<Record<string, string>>({})
const error = ref('')
const showPassword = ref(false)
const loading = ref(false)
const { login } = useAuth()
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  errors.value = {}

  if (!form.value.email) {
    errors.value.email = 'Укажите email'
    return
  }
  if (!form.value.password) {
    errors.value.password = 'Укажите пароль'
    return
  }

  loading.value = true
  try {
    await login(form.value.email, form.value.password)
    await router.push('/')
  } catch (e: any) {
    error.value = e.response?.data?.error || 'Ошибка входа'
  } finally {
    loading.value = false
  }
}
</script>
