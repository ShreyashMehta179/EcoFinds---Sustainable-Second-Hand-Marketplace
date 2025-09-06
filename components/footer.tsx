import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-green-600">EcoFinds</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your sustainable second-hand marketplace. Buy smart, live sustainable. Discover quality pre-loved items
              while reducing environmental impact.
            </p>
            <p className="text-sm text-muted-foreground">© 2024 EcoFinds. All rights reserved.</p>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-green-600 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-muted-foreground hover:text-green-600 transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-green-600 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-green-600 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-green-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-green-600 transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-green-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-green-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
