"use client"

import { useState } from "react"
import { Search, Sparkles, Bot, Users, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DictionaryPage from "@/components/dictionary-page"
import TranslatorPage from "@/components/translator-page"
import AvatarPage from "@/components/avatar-page"
import CommunityPage from "@/components/community-page"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function SonDamPage() {
  const [activeTab, setActiveTab] = useState<"dictionary" | "translator" | "avatar" | "community">("dictionary")
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-chart-1 to-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-primary-foreground font-bold text-lg">손</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                SonDam
              </h1>
              <span className="text-xs text-muted-foreground hidden sm:block">손으로 전하는 마음</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            <Button
              variant={activeTab === "dictionary" ? "default" : "ghost"}
              onClick={() => setActiveTab("dictionary")}
              size="sm"
              className="gap-2 h-10 rounded-2xl px-5 transition-all duration-300"
            >
              <Search className="w-4 h-4" />
              <span>수화 사전</span>
            </Button>
            <Button
              variant={activeTab === "translator" ? "default" : "ghost"}
              onClick={() => setActiveTab("translator")}
              size="sm"
              className="gap-2 h-10 rounded-2xl px-5 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI 번역</span>
            </Button>
            <Button
              variant={activeTab === "avatar" ? "default" : "ghost"}
              onClick={() => setActiveTab("avatar")}
              size="sm"
              className="gap-2 h-10 rounded-2xl px-5 transition-all duration-300"
            >
              <Bot className="w-4 h-4" />
              <span>아바타</span>
            </Button>
            <Button
              variant={activeTab === "community" ? "default" : "ghost"}
              onClick={() => setActiveTab("community")}
              size="sm"
              className="gap-2 h-10 rounded-2xl px-5 transition-all duration-300"
            >
              <Users className="w-4 h-4" />
              <span>커뮤니티</span>
            </Button>
          </nav>

          <div className="ml-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" className="rounded-2xl px-5" onClick={() => router.push("/login")}>
                <User className="w-4 h-4 mr-2" />
                로그인
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {activeTab === "dictionary" && <DictionaryPage />}
        {activeTab === "translator" && <TranslatorPage />}
        {activeTab === "avatar" && <AvatarPage />}
        {activeTab === "community" && <CommunityPage />}
      </main>

      <nav className="lg:hidden sticky bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/80 safe-area-inset-bottom shadow-2xl">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Button
            variant={activeTab === "dictionary" ? "default" : "ghost"}
            onClick={() => setActiveTab("dictionary")}
            className="flex flex-col items-center gap-1.5 h-auto py-3 px-1 rounded-2xl transition-all duration-300"
          >
            <Search className="w-5 h-5" />
            <span className="text-xs font-semibold">사전</span>
          </Button>
          <Button
            variant={activeTab === "translator" ? "default" : "ghost"}
            onClick={() => setActiveTab("translator")}
            className="flex flex-col items-center gap-1.5 h-auto py-3 px-1 rounded-2xl transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-semibold">번역</span>
          </Button>
          <Button
            variant={activeTab === "avatar" ? "default" : "ghost"}
            onClick={() => setActiveTab("avatar")}
            className="flex flex-col items-center gap-1.5 h-auto py-3 px-1 rounded-2xl transition-all duration-300"
          >
            <Bot className="w-5 h-5" />
            <span className="text-xs font-semibold">아바타</span>
          </Button>
          <Button
            variant={activeTab === "community" ? "default" : "ghost"}
            onClick={() => setActiveTab("community")}
            className="flex flex-col items-center gap-1.5 h-auto py-3 px-1 rounded-2xl transition-all duration-300"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-semibold">커뮤니티</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}
