/**
 * Загрузка списка сущностей для v-select связей (контрагент, клиент, проект и т.д.).
 * API может возвращать ключи в camelCase или lowercase — нормализуем отображение.
 */
export function useRelationOptions (apiPath: string, options?: { titleKey?: string; valueKey?: string }) {
  const api = useApi()
  const items = ref<Record<string, any>[]>([])
  const loading = ref(false)

  const titleKey = options?.titleKey ?? 'name'
  const valueKey = options?.valueKey ?? 'id'

  const getTitle = (item: Record<string, any>) => {
    if (!item) return ''
    const k = titleKey in item ? titleKey : Object.keys(item).find(key => key.toLowerCase() === titleKey.toLowerCase())
    const v = k ? item[k] : (item.name ?? item.id ?? '')
    return v != null ? String(v) : ''
  }

  const getValue = (item: Record<string, any>) => {
    if (!item) return undefined
    const k = valueKey in item ? valueKey : Object.keys(item).find(key => key.toLowerCase() === valueKey.toLowerCase())
    const v = k ? item[k] : item.id
    if (v === undefined || v === null) return undefined
    const n = Number(v)
    return Number.isInteger(n) ? n : v
  }

  const fetchOptions = async () => {
    loading.value = true
    try {
      const res = await api.get(apiPath)
      const data = res.data
      items.value = Array.isArray(data) ? data : []
    } catch (e) {
      items.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    fetchOptions,
    itemTitle: getTitle,
    itemValue: getValue,
  }
}
