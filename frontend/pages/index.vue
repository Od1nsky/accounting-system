<template>
  <div>
    <h1 class="text-h4 mb-6">Welcome</h1>

    <v-row>
      <v-col v-for="stat in stats" :key="stat.label" cols="12" sm="6" md="4">
        <v-card class="text-center pa-6" elevation="2">
          <v-icon :icon="stat.icon" size="48" :color="stat.color" class="mb-4" />
          <div class="text-h3 font-weight-bold" :class="`text-${stat.color}`">
            {{ stat.value }}
          </div>
          <div class="text-subtitle-1 text-medium-emphasis mt-2">
            {{ stat.label }}
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-information</v-icon>
            Getting Started
          </v-card-title>
          <v-card-text>
            <p>Welcome to your new application! This project was generated with Mithril CLI.</p>
            <v-list>
              <v-list-item>
                <template #prepend>
                  <v-icon color="success">mdi-check</v-icon>
                </template>
                <v-list-item-title>Authentication is ready</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="success">mdi-check</v-icon>
                </template>
                <v-list-item-title>User management is configured</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="success">mdi-check</v-icon>
                </template>
                <v-list-item-title>Admin panel is available</v-list-item-title>
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
  middleware: 'auth'
})

const stats = ref([
  { label: 'Total Users', value: '0', icon: 'mdi-account-multiple', color: 'primary' },
  { label: 'Active', value: '0', icon: 'mdi-check-circle', color: 'success' },
  { label: 'Pending', value: '0', icon: 'mdi-clock', color: 'warning' },
])
</script>
