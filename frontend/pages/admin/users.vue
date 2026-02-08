<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4">Управление пользователями</h1>
      <v-btn color="primary" @click="createDialog = true">
        <v-icon start>mdi-account-plus</v-icon>
        Добавить пользователя
      </v-btn>
    </div>

    <!-- Filters -->
    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="search"
              label="Поиск"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              clearable
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="roleFilter"
              :items="['Все', 'admin', 'user']"
              label="Роль"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="sortBy"
              :items="['name', 'email', 'createdAt']"
              label="Сортировка"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Users Table -->
    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="filteredUsers"
          :loading="loading"
          :search="search"
        >
          <template #item.name="{ item }">
            <div class="d-flex align-center">
              <v-avatar color="primary" size="32" class="mr-2">
                <span class="text-caption">{{ item.name.charAt(0) }}</span>
              </v-avatar>
              <div>
                <div class="font-weight-medium">{{ item.name }}</div>
                <div class="text-caption text-medium-emphasis">{{ item.email }}</div>
              </div>
            </div>
          </template>

          <template #item.role="{ item }">
            <v-chip
              :color="item.role === 'admin' ? 'error' : 'default'"
              size="small"
            >
              {{ item.role }}
            </v-chip>
          </template>

          <template #item.createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>

          <template #item.actions="{ item }">
            <v-btn
              icon="mdi-pencil"
              size="small"
              variant="text"
              @click="editUser(item)"
            />
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              color="error"
              :disabled="item.id === currentUser?.id"
              @click="confirmDelete(item)"
            />
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="createDialog" max-width="500">
      <v-card>
        <v-card-title>{{ editingUser ? 'Редактировать пользователя' : 'Создать пользователя' }}</v-card-title>
        <v-card-text>
          <v-form ref="formRef">
            <v-text-field
              v-model="form.name"
              label="Имя"
              variant="outlined"
              :rules="[v => !!v || 'Укажите имя']"
            />
            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              variant="outlined"
              :rules="[v => !!v || 'Укажите email', v => /.+@.+\..+/.test(v) || 'Некорректный email']"
            />
            <v-text-field
              v-if="!editingUser"
              v-model="form.password"
              label="Пароль"
              type="password"
              variant="outlined"
              :rules="[v => !!v || 'Укажите пароль', v => v.length >= 6 || 'Пароль не менее 6 символов']"
            />
            <v-select
              v-model="form.role"
              :items="['user', 'admin']"
              label="Роль"
              variant="outlined"
              :rules="[v => !!v || 'Укажите роль']"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="closeDialog">Отмена</v-btn>
          <v-btn color="primary" @click="saveUser">
            {{ editingUser ? 'Сохранить' : 'Создать' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Подтвердить удаление</v-card-title>
        <v-card-text>
          Вы уверены, что хотите удалить пользователя «{{ userToDelete?.name }}»?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="deleteDialog = false">Отмена</v-btn>
          <v-btn color="error" @click="deleteUser">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: (to, from) => {
    const { user } = useAuth()
    if (!user.value || user.value.role !== 'admin') {
      return navigateTo('/')
    }
  }
})

const api = useApi()
const { user: currentUser } = useAuth()
const { success, error: showError } = useSnackbar()
const users = ref<any[]>([])
const loading = ref(false)
const createDialog = ref(false)
const deleteDialog = ref(false)
const userToDelete = ref<any>(null)
const editingUser = ref<any>(null)
const formRef = ref<any>(null)
const search = ref('')
const roleFilter = ref('Все')
const sortBy = ref('name')

const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'user'
})

const headers = [
  { title: 'Пользователь', key: 'name' },
  { title: 'Роль', key: 'role' },
  { title: 'Создан', key: 'createdAt' },
  { title: 'Действия', key: 'actions', sortable: false },
]

const filteredUsers = computed(() => {
  let filtered = users.value

  if (roleFilter.value !== 'Все') {
    filtered = filtered.filter(u => u.role === roleFilter.value)
  }

  return filtered
})

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await api.get('/api/auth/users')
    users.value = response.data
  } catch (error) {
    showError('Не удалось загрузить пользователей')
  } finally {
    loading.value = false
  }
}

const editUser = (user: any) => {
  editingUser.value = user
  form.value = {
    name: user.name,
    email: user.email,
    password: '',
    role: user.role
  }
  createDialog.value = true
}

const confirmDelete = (user: any) => {
  userToDelete.value = user
  deleteDialog.value = true
}

const saveUser = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  try {
    if (editingUser.value) {
      await api.put(`/api/auth/users/${editingUser.value.id}`, {
        name: form.value.name,
        email: form.value.email,
        role: form.value.role
      })
    } else {
      await api.post('/api/auth/register', form.value)
    }
    await fetchUsers()
    closeDialog()
    success(editingUser.value ? 'Пользователь обновлён' : 'Пользователь создан')
  } catch (error) {
    showError('Не удалось сохранить пользователя')
  }
}

const deleteUser = async () => {
  if (!userToDelete.value) return

  try {
    await api.delete(`/api/auth/users/${userToDelete.value.id}`)
    users.value = users.value.filter(u => u.id !== userToDelete.value.id)
    deleteDialog.value = false
    userToDelete.value = null
    success('Пользователь удалён')
  } catch (error) {
    showError('Не удалось удалить пользователя')
  }
}

const closeDialog = () => {
  createDialog.value = false
  editingUser.value = null
  form.value = {
    name: '',
    email: '',
    password: '',
    role: 'user'
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString()
}

onMounted(() => {
  fetchUsers()
})
</script>
