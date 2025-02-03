import type React from "react"

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t mt-8">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ConnectSphere. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

