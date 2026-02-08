<template>
  <div>
    <h1 class="text-h4 mb-6">Панель управления</h1>

    <v-row>
      <v-col v-for="stat in stats" :key="stat.label" cols="12" sm="6" md="3">
        <v-card class="pa-4" elevation="2" :to="stat.link">
          <div class="d-flex align-center">
            <v-avatar :color="stat.color" size="48" class="mr-4">
              <v-icon :icon="stat.icon" color="white" />
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold">{{ stat.value }}</div>
              <div class="text-body-2 text-medium-emphasis">{{ stat.label }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-lightning-bolt</v-icon>
            Быстрые действия
          </v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col v-for="action in quickActions" :key="action.title" cols="6">
                <v-btn
                  :to="action.link"
                  :prepend-icon="action.icon"
                  variant="tonal"
                  :color="action.color"
                  block
                  class="mb-2"
                >
                  {{ action.title }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-clock-outline</v-icon>
            Недавняя активность
          </v-card-title>
          <v-card-text>
            <v-list v-if="recentTransactions.length" density="compact">
              <v-list-item
                v-for="tx in recentTransactions"
                :key="tx.id"
                :subtitle="`${tx.type || 'Transaction'} - ${tx.date || tx.createdAt || ''}`"
              >
                <template #prepend>
                  <v-icon color="primary" size="small">mdi-swap-horizontal</v-icon>
                </template>
                <v-list-item-title>{{ tx.description || `#${tx.id}` }} &mdash; {{ tx.amount }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <div v-else class="text-center text-medium-emphasis py-4">
              Нет недавних транзакций
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const api = useApi()

const stats = ref([
  { label: 'Клиенты', value: '...', icon: 'mdi-account-group', color: 'primary', link: '/client' },
  { label: 'Проекты', value: '...', icon: 'mdi-folder-multiple', color: 'success', link: '/project' },
  { label: 'Сотрудники', value: '...', icon: 'mdi-badge-account', color: 'info', link: '/employee' },
  { label: 'Счета', value: '...', icon: 'mdi-receipt-text', color: 'warning', link: '/invoice' },
])

const quickActions = [
  { title: 'Новый клиент', icon: 'mdi-plus', color: 'primary', link: '/client/create' },
  { title: 'Новый счёт', icon: 'mdi-plus', color: 'warning', link: '/invoice/create' },
  { title: 'Новый проект', icon: 'mdi-plus', color: 'success', link: '/project/create' },
  { title: 'Новая задача', icon: 'mdi-plus', color: 'info', link: '/task/create' },
  { title: 'Новый сотрудник', icon: 'mdi-plus', color: 'secondary', link: '/employee/create' },
  { title: 'Новая транзакция', icon: 'mdi-plus', color: 'error', link: '/transaction/create' },
]

const recentTransactions = ref<any[]>([])

const fetchStats = async () => {
  const endpoints = [
    { key: 0, url: '/api/clients' },
    { key: 1, url: '/api/projects' },
    { key: 2, url: '/api/employees' },
    { key: 3, url: '/api/invoices' },
  ]

  for (const ep of endpoints) {
    try {
      const response = await api.get(ep.url)
      const data = Array.isArray(response.data) ? response.data : []
      stats.value[ep.key].value = String(data.length)
    } catch {
      stats.value[ep.key].value = '0'
    }
  }
}

const fetchRecentTransactions = async () => {
  try {
    const response = await api.get('/api/transactions')
    const data = Array.isArray(response.data) ? response.data : []
    recentTransactions.value = data.slice(0, 5)
  } catch {
    recentTransactions.value = []
  }
}

onMounted(() => {
  fetchStats()
  fetchRecentTransactions()
})
</script>
