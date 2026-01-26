export const useToast = () => {
  const show = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    // Simple console implementation - can be replaced with a toast library
    console.log(`[${type.toUpperCase()}]`, message)
    // TODO: Integrate with a toast notification library like vue-toastification
  }

  return {
    success: (message: string) => show(message, 'success'),
    error: (message: string) => show(message, 'error'),
    info: (message: string) => show(message, 'info'),
    warning: (message: string) => show(message, 'warning'),
  }
}
