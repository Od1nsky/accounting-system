<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4">User Management</h1>
      <v-btn color="primary" @click="createDialog = true">
        <v-icon start>mdi-account-plus</v-icon>
        Add User
      </v-btn>
    </div>

    <!-- Filters -->
    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="search"
              label="Search"
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
              :items="['All', 'admin', 'user']"
              label="Filter by Role"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="sortBy"
              :items="['name', 'email', 'createdAt']"
              label="Sort by"
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
        <v-card-title>{{ editingUser ? 'Edit User' : 'Create User' }}</v-card-title>
        <v-card-text>
          <v-form ref="formRef">
            <v-text-field
              v-model="form.name"
              label="Name"
              variant="outlined"
              :rules="[v => !!v || 'Name is required']"
            />
            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              variant="outlined"
              :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Email must be valid']"
            />
            <v-text-field
              v-if="!editingUser"
              v-model="form.password"
              label="Password"
              type="password"
              variant="outlined"
              :rules="[v => !!v || 'Password is required', v => v.length >= 6 || 'Password must be at least 6 characters']"
            />
            <v-select
              v-model="form.role"
              :items="['user', 'admin']"
              label="Role"
              variant="outlined"
              :rules="[v => !!v || 'Role is required']"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="saveUser">
            {{ editingUser ? 'Update' : 'Create' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete user "{{ userToDelete?.name }}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteUser">Delete</v-btn>
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
const users = ref<any[]>([])
const loading = ref(false)
const createDialog = ref(false)
const deleteDialog = ref(false)
const userToDelete = ref<any>(null)
const editingUser = ref<any>(null)
const formRef = ref<any>(null)
const search = ref('')
const roleFilter = ref('All')
const sortBy = ref('name')

const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'user'
})

const headers = [
  { title: 'User', key: 'name' },
  { title: 'Role', key: 'role' },
  { title: 'Created', key: 'createdAt' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const filteredUsers = computed(() => {
  let filtered = users.value

  if (roleFilter.value !== 'All') {
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
    console.error('Failed to fetch users:', error)
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
  } catch (error) {
    console.error('Failed to save user:', error)
  }
}

const deleteUser = async () => {
  if (!userToDelete.value) return

  try {
    await api.delete(`/api/auth/users/${userToDelete.value.id}`)
    users.value = users.value.filter(u => u.id !== userToDelete.value.id)
    deleteDialog.value = false
    userToDelete.value = null
  } catch (error) {
    console.error('Failed to delete user:', error)
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
