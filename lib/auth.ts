export interface User {
  id: string
  name: string
  email: string
  location: string
  joinedAt: Date | string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token?: string
}

// Mock user data
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  location: "Mumbai, Maharashtra",
  joinedAt: new Date("2024-01-15"),
}

const dispatchAuthUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("authUpdated"))
  }
}

export const authStorage = {
  getAuthState(): AuthState {
    if (typeof window === "undefined") return { user: null, isAuthenticated: false }
    try {
      const auth = localStorage.getItem("ecofinds-auth")
      return auth ? JSON.parse(auth) : { user: null, isAuthenticated: false }
    } catch {
      return { user: null, isAuthenticated: false }
    }
  },

  setAuthState(authState: AuthState): void {
    if (typeof window === "undefined") return
    localStorage.setItem("ecofinds-auth", JSON.stringify(authState))
    dispatchAuthUpdate()
  },

  login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock login validation
        if (email && password.length >= 6) {
          this.setAuthState({ 
            user: mockUser, 
            isAuthenticated: true,
            token: 'mock-jwt-token'
          })
          resolve({ success: true })
        } else {
          resolve({ success: false, error: "Invalid email or password" })
        }
      }, 1000)
    })
  },

  register(
    name: string,
    email: string,
    password: string,
    location: string,
  ): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock registration validation
        if (name && email && password.length >= 6 && location) {
          const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            location,
            joinedAt: new Date(),
          }
          this.setAuthState({ user: newUser, isAuthenticated: true })
          resolve({ success: true })
        } else {
          resolve({ success: false, error: "Please fill all fields correctly" })
        }
      }, 1000)
    })
  },

  logout(): void {
    this.setAuthState({ user: null, isAuthenticated: false })
  },
}
