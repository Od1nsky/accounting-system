<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4">Technology</h1>
      <v-btn color="primary" to="/technology/create">
        <v-icon start>mdi-plus</v-icon>
        Create New
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
              :to="`/${entityLower}/edit/${item.id}`"
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
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this item?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteItem">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const api = useApi()
const items = ref<any[]>([])
const loading = ref(false)
const deleteDialog = ref(false)
const itemToDelete = ref<any>(null)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Version', key: 'version' },
  { title: 'Description', key: 'description' },
  { title: 'LicenseType', key: 'licenseType' },
  { title: 'IsActive', key: 'isActive' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const fetchItems = async () => {
  loading.value = true
  try {
    const response = await api.get('/api/technologys')
    items.value = response.data
  } catch (error) {
    console.error('Failed to fetch technologys:', error)
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
    await api.delete(`/api/${entityPlural}/${itemToDelete.value.id}`)
    items.value = items.value.filter(i => i.id !== itemToDelete.value.id)
    deleteDialog.value = false
    itemToDelete.value = null
  } catch (error) {
    console.error('Failed to delete item:', error)
  }
}

onMounted(() => {
  fetchItems()
})
</script>
