// API Response types
export interface ApiResponse<T> {
  data: T
  error?: string
}

// User types
export interface User {
  id: number
  email: string
  name: string
  role: string
  createdAt?: string
}

// Auth types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  role?: string
}

export interface AuthResponse {
  token: string
  user: User
}
