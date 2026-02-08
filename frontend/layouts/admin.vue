<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          :title="user?.name"
          :subtitle="user?.email"
        />
      </v-list>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
          :value="item.to"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Панель администратора</v-toolbar-title>

      <v-spacer />

      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon @click="handleLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const router = useRouter()
const drawer = ref(true)

const menuItems = [
  { title: 'Панель управления', icon: 'mdi-view-dashboard', to: '/admin' },
  { title: 'Пользователи', icon: 'mdi-account-multiple', to: '/admin/users' },
  { title: 'Настройки', icon: 'mdi-cog', to: '/admin/settings' },
]

const handleLogout = async () => {
  logout()
  await router.push('/login')
}
</script>
