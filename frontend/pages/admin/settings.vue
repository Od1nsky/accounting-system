<template>
  <div>
    <h1 class="text-h4 mb-6">Настройки</h1>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-cog</v-icon>
            Общие настройки
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="settings.siteName"
                label="Название сайта"
                variant="outlined"
              />
              <v-text-field
                v-model="settings.siteUrl"
                label="URL сайта"
                variant="outlined"
              />
              <v-textarea
                v-model="settings.siteDescription"
                label="Описание сайта"
                variant="outlined"
                rows="3"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="saveSettings">
              Сохранить изменения
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-email</v-icon>
            Настройки почты
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="settings.smtpHost"
                label="SMTP сервер"
                variant="outlined"
              />
              <v-text-field
                v-model="settings.smtpPort"
                label="SMTP порт"
                type="number"
                variant="outlined"
              />
              <v-text-field
                v-model="settings.smtpUser"
                label="Имя пользователя SMTP"
                variant="outlined"
              />
              <v-text-field
                v-model="settings.smtpPassword"
                label="Пароль SMTP"
                type="password"
                variant="outlined"
              />
            </v-form>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>
            <v-icon start>mdi-shield-lock</v-icon>
            Безопасность
          </v-card-title>
          <v-card-text>
            <v-switch
              v-model="settings.twoFactorAuth"
              label="Двухфакторная аутентификация"
              color="primary"
            />
            <v-switch
              v-model="settings.emailVerification"
              label="Требовать подтверждение email"
              color="primary"
            />
            <v-switch
              v-model="settings.passwordExpiry"
              label="Срок действия пароля (90 дней)"
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

const { success } = useSnackbar()

const defaultSettings = {
  siteName: 'Бухгалтерская система',
  siteUrl: 'https://example.com',
  siteDescription: 'Описание приложения',
  smtpHost: '',
  smtpPort: 587,
  smtpUser: '',
  smtpPassword: '',
  twoFactorAuth: false,
  emailVerification: false,
  passwordExpiry: false,
}

const loadSettings = () => {
  if (import.meta.client) {
    const saved = localStorage.getItem('app_settings')
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) }
      } catch {}
    }
  }
  return { ...defaultSettings }
}

const settings = ref(loadSettings())

const saveSettings = () => {
  if (import.meta.client) {
    localStorage.setItem('app_settings', JSON.stringify(settings.value))
  }
  success('Настройки сохранены')
}
</script>
