"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DocsThemeToggle() {
  const [theme, setThemeState] = React.useState<'light' | 'dark'>('dark')

  React.useEffect(() => {
    // Load theme from localStorage on mount
    const stored = localStorage.getItem('docs-theme') as 'light' | 'dark' | null
    if (stored) {
      setThemeState(stored)
      // Apply theme to the docs container only
      const docsContainer = document.querySelector('[data-docs-theme-root]')
      if (docsContainer) {
        docsContainer.classList.remove('light', 'dark')
        docsContainer.classList.add(stored)
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setThemeState(newTheme)
    localStorage.setItem('docs-theme', newTheme)
    
    // Apply theme to the docs container only
    const docsContainer = document.querySelector('[data-docs-theme-root]')
    if (docsContainer) {
      docsContainer.classList.remove('light', 'dark')
      docsContainer.classList.add(newTheme)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle docs theme</span>
    </Button>
  )
}