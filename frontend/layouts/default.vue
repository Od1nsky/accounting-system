<template>
  <v-app>
    <v-app-bar elevation="1">
      <v-app-bar-nav-icon v-if="isAuthenticated" @click="drawer = !drawer" />
      <v-app-bar-title>Бухгалтерская система</v-app-bar-title>

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
        <v-btn to="/login">Вход</v-btn>
        <v-btn to="/register">Регистрация</v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-if="isAuthenticated" v-model="drawer" width="280">
      <v-list density="compact" nav>
        <v-list-item to="/" prepend-icon="mdi-view-dashboard" title="Панель управления" />

        <v-list-group value="Business">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-domain" title="Бизнес" />
          </template>
          <v-list-item to="/client" title="Клиенты" prepend-icon="mdi-account-group" />
          <v-list-item to="/counterparty" title="Контрагенты" prepend-icon="mdi-handshake" />
          <v-list-item to="/contract" title="Договоры" prepend-icon="mdi-file-sign" />
        </v-list-group>

        <v-list-group value="Accounting">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-calculator" title="Бухгалтерия" />
          </template>
          <v-list-item to="/account" title="Счета" prepend-icon="mdi-book-open-variant" />
          <v-list-item to="/transaction" title="Транзакции" prepend-icon="mdi-swap-horizontal" />
          <v-list-item to="/invoice" title="Счета (накладные)" prepend-icon="mdi-receipt-text" />
          <v-list-item to="/payment" title="Платежи" prepend-icon="mdi-credit-card" />
          <v-list-item to="/budget" title="Бюджеты" prepend-icon="mdi-chart-pie" />
          <v-list-item to="/taxrecord" title="Налоговые записи" prepend-icon="mdi-file-percent" />
          <v-list-item to="/reconciliation" title="Сверки" prepend-icon="mdi-check-decagram" />
        </v-list-group>

        <v-list-group value="Banking">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-bank" title="Банк и касса" />
          </template>
          <v-list-item to="/bankoperation" title="Банковские операции" prepend-icon="mdi-bank-transfer" />
          <v-list-item to="/cashoperation" title="Кассовые операции" prepend-icon="mdi-cash-register" />
        </v-list-group>

        <v-list-group value="HR">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-account-hard-hat" title="Кадры и зарплата" />
          </template>
          <v-list-item to="/employee" title="Сотрудники" prepend-icon="mdi-badge-account" />
          <v-list-item to="/salarypayment" title="Выплаты зарплаты" prepend-icon="mdi-cash-multiple" />
        </v-list-group>

        <v-list-group value="Inventory">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-warehouse" title="Склад и активы" />
          </template>
          <v-list-item to="/product" title="Товары" prepend-icon="mdi-package-variant-closed" />
          <v-list-item to="/inventory" title="Остатки" prepend-icon="mdi-clipboard-list" />
          <v-list-item to="/warehouseoperation" title="Складские операции" prepend-icon="mdi-forklift" />
          <v-list-item to="/asset" title="Активы" prepend-icon="mdi-office-building" />
          <v-list-item to="/depreciation" title="Амортизация" prepend-icon="mdi-trending-down" />
        </v-list-group>

        <v-list-group value="Projects">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-folder-multiple" title="Управление проектами" />
          </template>
          <v-list-item to="/project" title="Проекты" prepend-icon="mdi-folder" />
          <v-list-item to="/milestone" title="Этапы" prepend-icon="mdi-flag-checkered" />
          <v-list-item to="/sprint" title="Спринты" prepend-icon="mdi-run-fast" />
          <v-list-item to="/task" title="Задачи" prepend-icon="mdi-checkbox-marked-outline" />
          <v-list-item to="/timeentry" title="Учёт времени" prepend-icon="mdi-clock-outline" />
          <v-list-item to="/projectexpense" title="Расходы по проектам" prepend-icon="mdi-currency-usd" />
        </v-list-group>

        <v-list-group value="IT">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-server" title="ИТ-инфраструктура" />
          </template>
          <v-list-item to="/repository" title="Репозитории" prepend-icon="mdi-source-repository" />
          <v-list-item to="/technology" title="Технологии" prepend-icon="mdi-language-javascript" />
          <v-list-item to="/subscription" title="Подписки" prepend-icon="mdi-card-account-details" />
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      location="bottom right"
    >
      {{ snackbar.message }}
      <template #actions>
        <v-btn variant="text" @click="snackbar.show = false">Закрыть</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
const { isAuthenticated, user, logout } = useAuth()
const router = useRouter()
const drawer = ref(true)
const { snackbar } = useSnackbar()

const handleLogout = async () => {
  logout()
  await router.push('/login')
}
</script>
