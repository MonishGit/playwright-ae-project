import { type APIRequestContext, expect } from '@playwright/test'

export class ApiClient {
  private request: APIRequestContext
  private baseUrl = 'https://automationexercise.com'

  constructor(request: APIRequestContext) {
    this.request = request
  }

  // ── Create Account ─────────────────────────────────────
  async createAccount(userData: {
    name: string
    email: string
    password: string
    title: string
    firstname: string
    lastname: string
    company: string
    address1: string
    address2: string
    country: string
    zipcode: string
    state: string
    city: string
    mobile_number: string
    birth_date: string
    birth_month: string
    birth_year: string
  }) {
    // API uses form-encoded data — not JSON
    // This is important — wrong content type = 400 error
    const formData = new URLSearchParams()
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value)
    })

    const response = await this.request.post(
      `${this.baseUrl}/api/createAccount`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData.toString()
      }
    )

    const body = await response.json()
    return { status: response.status(), body }
  }

  // ── Delete Account ─────────────────────────────────────
  async deleteAccount(email: string, password: string) {
    const formData = new URLSearchParams()
    formData.append('email', email)
    formData.append('password', password)

    const response = await this.request.delete(
      `${this.baseUrl}/api/deleteAccount`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData.toString()
      }
    )

    const body = await response.json()
    return { status: response.status(), body }
  }

  // ── Verify Login ───────────────────────────────────────
  async verifyLogin(email: string, password: string) {
    const formData = new URLSearchParams()
    formData.append('email', email)
    formData.append('password', password)

    const response = await this.request.post(
      `${this.baseUrl}/api/verifyLogin`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData.toString()
      }
    )

    const body = await response.json()
    return { status: response.status(), body }
  }

  // ── Get Products List ──────────────────────────────────
  async getProductsList() {
    const response = await this.request.get(
      `${this.baseUrl}/api/productsList`
    )
    const body = await response.json()
    return { status: response.status(), body }
  }
}