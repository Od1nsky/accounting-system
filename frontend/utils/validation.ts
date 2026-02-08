/**
 * Общие правила валидации для форм: телефон, даты.
 */

/** Допустимые форматы: +7..., 8..., 10 цифр, с пробелами/дефисами/скобками */
const PHONE_REGEX = /^[\d\s\-+()]*$/
const PHONE_DIGITS_MIN = 10
const PHONE_DIGITS_MAX = 15

function countDigits (s: string): number {
  return (s || '').replace(/\D/g, '').length
}

export function phoneRule (v: string | undefined): true | string {
  if (v == null || String(v).trim() === '') return true
  const str = String(v).trim()
  if (!PHONE_REGEX.test(str)) return 'Допустимы только цифры, пробелы, + - ( )'
  const digits = countDigits(str)
  if (digits > 0 && (digits < PHONE_DIGITS_MIN || digits > PHONE_DIGITS_MAX)) {
    return `В номере должно быть от ${PHONE_DIGITS_MIN} до ${PHONE_DIGITS_MAX} цифр`
  }
  return true
}

/** Дата не в будущем (на сегодня и раньше) */
export function dateNotFutureRule (v: string | undefined): true | string {
  if (!v) return true
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return true
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return d <= today || 'Дата не может быть в будущем'
}

/** Дата не раньше указанной (например, дата окончания >= дата начала) */
export function dateNotBeforeRule (minDate: string | undefined) {
  return (v: string | undefined): true | string => {
    if (!v) return true
    if (!minDate) return true
    return new Date(v) >= new Date(minDate) || 'Дата не может быть раньше указанной'
  }
}

/** Дата не позже указанной */
export function dateNotAfterRule (maxDate: string | undefined) {
  return (v: string | undefined): true | string => {
    if (!v) return true
    if (!maxDate) return true
    return new Date(v) <= new Date(maxDate) || 'Дата не может быть позже указанной'
  }
}

/** Разумный диапазон дат: не раньше 1900, не позже 2100 */
const MIN_YEAR = 1900
const MAX_YEAR = 2100

export function dateSensibleRule (v: string | undefined): true | string {
  if (!v) return true
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return true
  const y = d.getFullYear()
  if (y < MIN_YEAR || y > MAX_YEAR) return `Год должен быть от ${MIN_YEAR} до ${MAX_YEAR}`
  return true
}
