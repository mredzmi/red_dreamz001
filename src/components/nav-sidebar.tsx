'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Brain,
  Calendar,
  MessageSquare,
  Users,
  TrendingUp,
  Settings,
  LogOut,
} from 'lucide-react'
import { logout } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/emotion', label: 'Emotion Learning', icon: Brain },
  { href: '/app/schedule', label: 'Visual Schedule', icon: Calendar },
  { href: '/app/aac', label: 'AAC Board', icon: MessageSquare },
  { href: '/app/social', label: 'Social Skills', icon: Users },
  { href: '/app/progress', label: 'Progress', icon: TrendingUp },
  { href: '/app/settings', label: 'Settings', icon: Settings },
]

interface NavSidebarProps {
  userName?: string
  userRole?: string
  plan?: string
}

export default function NavSidebar({ userName, userRole, plan }: NavSidebarProps = {}) {
  const pathname = usePathname()

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-border min-h-screen flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/app/dashboard" className="text-xl font-bold text-primary">
          MyLuths
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User info + Logout */}
      <div className="p-4 border-t border-border space-y-3">
        {userName && (
          <div className="px-1">
            <p className="text-sm font-medium text-foreground truncate">{userName}</p>
            {plan && <p className="text-xs text-muted-foreground">{plan} Plan</p>}
          </div>
        )}
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </form>
      </div>
    </aside>
  )
}
