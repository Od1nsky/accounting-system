<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4">Контрагенты</h1>
      <v-btn color="primary" to="/counterparty/create">
        <v-icon start>mdi-plus</v-icon>
        Создать
      </v-btn>
    </div>

    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          :loading="loading"
        >
          <template #item.actions="{ item }">
            <v-btn
              icon="mdi-pencil"
              size="small"
              variant="text"
              :to="`/counterparty/edit/${item.id}`"
            />
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              color="error"
              @click="confirmDelete(item)"
            />
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title>Подтвердить удаление</v-card-title>
        <v-card-text>
          Вы уверены, что хотите удалить эту запись?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="deleteDialog = false">Отмена</v-btn>
          <v-btn color="error" @click="deleteItem">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})


const { success, error: showError } = useSnackbar()
const api = useApi()
const items = ref<any[]>([])
const loading = ref(false)
const deleteDialog = ref(false)
const itemToDelete = ref<any>(null)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Название', key: 'name' },
  { title: 'Тип', key: 'type' },
  { title: 'Inn', key: 'inn' },
  { title: 'Kpp', key: 'kpp' },
  { title: 'Ogrn', key: 'ogrn' },
  { title: 'Address', key: 'address' },
  { title: 'Телефон', key: 'phone' },
  { title: 'Email', key: 'email' },
  { title: 'BankAccount', key: 'bankAccount' },
  { title: 'BankName', key: 'bankName' },
  { title: 'Bik', key: 'bik' },
  { title: 'Активен', key: 'isActive' },
  { title: 'Действия', key: 'actions', sortable: false },
]

const fetchItems = async () => {
  loading.value = true
  try {
    const response = await api.get('/api/counterparties')
    items.value = response.data
  } catch (error) {
    showError('Не удалось загрузить данные')
  } finally {
    loading.value = false
  }
}

const confirmDelete = (item: any) => {
  itemToDelete.value = item
  deleteDialog.value = true
}

const deleteItem = async () => {
  if (!itemToDelete.value) return

  try {
    await api.delete(`/api/counterparties/${itemToDelete.value.id}`)
    items.value = items.value.filter(i => i.id !== itemToDelete.value.id)
    deleteDialog.value = false
    success('Запись удалена')
    itemToDelete.value = null
  } catch (error) {
    showError('Не удалось удалить запись')
  }
}

onMounted(() => {
  fetchItems()
})
</script>
