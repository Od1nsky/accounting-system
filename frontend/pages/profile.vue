<template>
  <div>
    <h1 class="text-h4 mb-6">Профиль</h1>

    <v-card max-width="600">
      <v-card-text>
        <div class="text-center mb-4">
          <v-avatar size="120" color="primary">
            <v-icon size="60">mdi-account</v-icon>
          </v-avatar>
        </div>

        <v-form v-if="editing" ref="formRef" @submit.prevent="saveProfile">
          <v-text-field
            v-model="form.name"
            label="Имя"
            variant="outlined"
            :rules="[v => !!v || 'Укажите имя']"
          />
          <v-text-field
            v-model="form.email"
            label="Email"
            variant="outlined"
            type="email"
            :rules="[v => !!v || 'Укажите email']"
          />
          <v-chip class="mb-4" color="primary" variant="outlined">
            <v-icon start>mdi-shield-account</v-icon>
            Роль: {{ user?.role }}
          </v-chip>

          <div class="d-flex justify-end mt-4">
            <v-btn variant="text" class="mr-2" @click="cancelEdit">Отмена</v-btn>
            <v-btn type="submit" color="primary" :loading="loading">Сохранить</v-btn>
          </div>
        </v-form>

        <div v-else>
          <v-list>
            <v-list-item>
              <template #prepend>
                <v-icon>mdi-account</v-icon>
              </template>
              <v-list-item-title>Имя</v-list-item-title>
              <v-list-item-subtitle>{{ user?.name }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon>mdi-email</v-icon>
              </template>
              <v-list-item-title>Email</v-list-item-title>
              <v-list-item-subtitle>{{ user?.email }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-icon>mdi-shield-account</v-icon>
              </template>
              <v-list-item-title>Роль</v-list-item-title>
              <v-list-item-subtitle>{{ user?.role }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <div class="d-flex justify-end mt-4">
            <v-btn color="primary" @click="startEdit">
              <v-icon start>mdi-pencil</v-icon>
              Редактировать профиль
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
const api = useApi()
const { success, error: showError } = useSnackbar()
const editing = ref(false)
const loading = ref(false)
const formRef = ref<any>(null)

const form = ref({
  name: '',
  email: '',
})

const startEdit = () => {
  form.value.name = user.value?.name || ''
  form.value.email = user.value?.email || ''
  editing.value = true
}

const cancelEdit = () => {
  editing.value = false
}

const saveProfile = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await api.put(`/api/auth/users/${user.value?.id}`, form.value)
    if (user.value) {
      user.value.name = form.value.name
      user.value.email = form.value.email
    }
    editing.value = false
    success('Профиль обновлён')
  } catch (err) {
    showError('Не удалось обновить профиль')
  } finally {
    loading.value = false
  }
}
</script>
