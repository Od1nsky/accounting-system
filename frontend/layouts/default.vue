<template>
  <v-app>
    <v-app-bar elevation="1">
      <v-app-bar-title>{{ $route.meta.title || 'My App' }}</v-app-bar-title>

      <template v-if="isAuthenticated">
        <v-btn icon to="/">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon to="/profile">
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn v-if="user?.role === 'admin'" icon to="/admin">
          <v-icon>mdi-shield-account</v-icon>
        </v-btn>
        <v-btn icon @click="handleLogout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn to="/login">Login</v-btn>
        <v-btn to="/register">Register</v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const { isAuthenticated, user, logout } = useAuth()
const router = useRouter()

const handleLogout = async () => {
  logout()
  await router.push('/login')
}
</script>
