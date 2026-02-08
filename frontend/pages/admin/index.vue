<template>
  <div>
    <h1 class="text-h4 mb-6">Панель администратора</h1>

    <!-- Stats Cards -->
    <v-row>
      <v-col v-for="stat in stats" :key="stat.title" cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-h4 font-weight-bold" :class="`text-${stat.color}`">
                  {{ stat.value }}
                </div>
                <div class="text-subtitle-2 text-medium-emphasis mt-1">
                  {{ stat.title }}
                </div>
              </div>
              <v-avatar :color="stat.color" size="56">
                <v-icon :icon="stat.icon" size="32" color="white" />
              </v-avatar>
            </div>
            <div v-if="stat.change" class="mt-2">
              <v-chip
                :color="stat.change > 0 ? 'success' : 'error'"
                size="small"
                variant="flat"
              >
                <v-icon
                  :icon="stat.change > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'"
                  size="16"
                  start
                />
                {{ Math.abs(stat.change) }}%
              </v-chip>
              <span class="text-caption text-medium-emphasis ml-2">к прошлому месяцу</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row -->
    <v-row class="mt-4">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-chart-line</v-icon>
            Обзор активности
          </v-card-title>
          <v-card-text>
            <div class="text-center py-8 text-medium-emphasis">
              <v-icon size="64">mdi-chart-areaspline</v-icon>
              <div class="mt-2">График — интеграция Chart.js</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-account-group</v-icon>
            Распределение пользователей
          </v-card-title>
          <v-card-text>
            <div class="text-center py-8 text-medium-emphasis">
              <v-icon size="64">mdi-chart-donut</v-icon>
              <div class="mt-2">График — интеграция Chart.js</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Activity -->
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-clock-outline</v-icon>
            Недавняя активность
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(activity, i) in recentActivity"
                :key="i"
                :prepend-icon="activity.icon"
              >
                <v-list-item-title>{{ activity.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ activity.time }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-account-multiple</v-icon>
            Последние пользователи
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(user, i) in latestUsers"
                :key="i"
              >
                <template #prepend>
                  <v-avatar color="primary">
                    <span>{{ user.name.charAt(0) }}</span>
                  </v-avatar>
                </template>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                <template #append>
                  <v-chip size="small" :color="getRoleColor(user.role)">
                    {{ user.role }}
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
const { error: showError } = useSnackbar()

const stats = ref([
  { title: 'Всего пользователей', value: '0', icon: 'mdi-account-multiple', color: 'primary', change: 12 },
  { title: 'Активные сессии', value: '0', icon: 'mdi-account-clock', color: 'success', change: 5 },
  { title: 'Доход', value: '$0', icon: 'mdi-currency-usd', color: 'info', change: -3 },
  { title: 'Новых сегодня', value: '0', icon: 'mdi-account-plus', color: 'warning', change: 8 },
])

const recentActivity = ref([
  { title: 'Новый пользователь зарегистрирован', time: '5 мин. назад', icon: 'mdi-account-plus' },
  { title: 'Резервная копия создана', time: '1 ч. назад', icon: 'mdi-database-check' },
  { title: 'Профиль пользователя обновлён', time: '2 ч. назад', icon: 'mdi-account-edit' },
  { title: 'Обслуживание системы', time: '5 ч. назад', icon: 'mdi-wrench' },
  { title: 'Проверка безопасности завершена', time: '1 дн. назад', icon: 'mdi-shield-check' },
])

const latestUsers = ref<any[]>([])

const getRoleColor = (role: string) => {
  return role === 'admin' ? 'error' : 'default'
}

const fetchStats = async () => {
  try {
    const usersResponse = await api.get('/api/auth/users')
    const users = usersResponse.data

    stats.value[0].value = users.length.toString()
    stats.value[3].value = users.filter((u: any) => {
      const createdAt = new Date(u.createdAt)
      const today = new Date()
      return createdAt.toDateString() === today.toDateString()
    }).length.toString()

    latestUsers.value = users.slice(0, 5)
  } catch (error) {
    showError('Не удалось загрузить статистику')
  }
}

onMounted(() => {
  fetchStats()
})
</script>
