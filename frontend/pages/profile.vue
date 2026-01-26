<template>
  <div>
    <h1 class="text-h4 mb-6">Profile</h1>

    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" class="text-center">
            <v-avatar size="120" color="primary">
              <v-icon size="60">mdi-account</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="8">
            <v-list>
              <v-list-item>
                <template #prepend>
                  <v-icon>mdi-account</v-icon>
                </template>
                <v-list-item-title>Name</v-list-item-title>
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
                <v-list-item-title>Role</v-list-item-title>
                <v-list-item-subtitle>{{ user?.role }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
</script>
