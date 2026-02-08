const snackbar = reactive({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000,
})

export const useSnackbar = () => {
  const success = (message: string) => {
    snackbar.message = message
    snackbar.color = 'success'
    snackbar.show = true
  }

  const error = (message: string) => {
    snackbar.message = message
    snackbar.color = 'error'
    snackbar.timeout = 5000
    snackbar.show = true
  }

  const info = (message: string) => {
    snackbar.message = message
    snackbar.color = 'info'
    snackbar.show = true
  }

  return {
    snackbar,
    success,
    error,
    info,
  }
}
