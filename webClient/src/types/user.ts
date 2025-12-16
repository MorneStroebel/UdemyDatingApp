export interface User {
  id: number,
  userName: string
  email: string
  token: string
  imageUrl?: string
}

export interface LoginCreds {
  email: string
  password: string
}

export interface RegisterCreds {
  userName: string
  email: string
  password: string
}
