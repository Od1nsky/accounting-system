<template>
  <div>
    <h1 class="text-h4 mb-6">Settings</h1>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-cog</v-icon>
            General Settings
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="settings.siteName"
                label="Site Name"
                variant="outlined"
              />
              <v-text-field
                v-model="settings.siteUrl"
                label="Site URL"
                variant="outlined"
              />
              <v-textarea
                v-model="settings.siteDescription"
                label="Site Description"
                variant="outlined"
                rows="3"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="saveSettings">
              Save Changes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-email</v-icon>
            Email Settings
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="settings.smtpHost"
                label="SMTP Host"
                variant="outlined"
              />
              <v-text-field
                v-model="settings.smtpPort"
                label="SMTP Port"
                type="number"
                variant="outlined"
              />
              <v-text-field
                v-model="settings.smtpUser"
                label="SMTP Username"
                variant="outlined"
              />
              <v-text-field
                v-model="settings.smtpPassword"
                label="SMTP Password"
                type="password"
                variant="outlined"
              />
            </v-form>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>
            <v-icon start>mdi-shield-lock</v-icon>
            Security
          </v-card-title>
          <v-card-text>
            <v-switch
              v-model="settings.twoFactorAuth"
              label="Enable Two-Factor Authentication"
              color="primary"
            />
            <v-switch
              v-model="settings.emailVerification"
              label="Require Email Verification"
              color="primary"
            />
            <v-switch
              v-model="settings.passwordExpiry"
              label="Enable Password Expiry (90 days)"
              color="primary"
            />
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

const settings = ref({
  siteName: 'My App',
  siteUrl: 'https://example.com',
  siteDescription: 'Description of my application',
  smtpHost: '',
  smtpPort: 587,
  smtpUser: '',
  smtpPassword: '',
  twoFactorAuth: false,
  emailVerification: false,
  passwordExpiry: false,
})

const saveSettings = () => {
  // TODO: Implement save settings API call
  console.log('Saving settings:', settings.value)
}
</script>
