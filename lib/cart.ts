export interface CartItem {
  productId: string
  quantity: number
  addedAt: Date
}

export interface CartItemWithProduct extends CartItem {
  product: {
    id: string
    name: string
    price: number
    image: string
    seller: string
    condition: string
  }
}

const dispatchCartUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cartUpdated"))
  }
}

// Cart management functions for localStorage
export const cartStorage = {
  getCart(): CartItem[] {
    if (typeof window === "undefined") return []
    try {
      const cart = localStorage.getItem("ecofinds-cart")
      return cart ? JSON.parse(cart) : []
    } catch {
      return []
    }
  },

  setCart(cart: CartItem[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem("ecofinds-cart", JSON.stringify(cart))
    dispatchCartUpdate()
  },

  addToCart(productId: string, quantity = 1): void {
    const cart = this.getCart()
    const existingItem = cart.find((item) => item.productId === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        productId,
        quantity,
        addedAt: new Date(),
      })
    }

    this.setCart(cart)
  },

  removeFromCart(productId: string): void {
    const cart = this.getCart().filter((item) => item.productId !== productId)
    this.setCart(cart)
  },

  updateQuantity(productId: string, quantity: number): void {
    const cart = this.getCart()
    const item = cart.find((item) => item.productId === productId)

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId)
      } else {
        item.quantity = quantity
        this.setCart(cart)
      }
    }
  },

  clearCart(): void {
    this.setCart([])
  },

  getCartCount(): number {
    return this.getCart().reduce((total, item) => total + item.quantity, 0)
  },
}
