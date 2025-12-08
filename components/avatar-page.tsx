"use client"

import { useState } from "react"
import { Bot, Play, Settings, Download, Zap, Palette, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function AvatarPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const [speed, setSpeed] = useState([1])
  const [showBackground, setShowBackground] = useState(true)

  const avatars = [
    { id: 0, name: "기본 아바타", description: "친근하고 밝은 느낌", color: "from-primary to-chart-1" },
    { id: 1, name: "전문가 아바타", description: "전문적이고 신뢰감 있는", color: "from-chart-2 to-chart-3" },
    { id: 2, name: "귀여운 아바타", description: "아이들이 좋아하는 스타일", color: "from-chart-4 to-chart-5" },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-3/10 border border-chart-3/20 mb-2">
            <Bot className="w-4 h-4 text-chart-3" />
            <span className="text-sm font-semibold text-chart-3">수화 아바타</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              3D 아바타가 수화를 시연해요
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            실감나는 3D 아바타가 정확한 수화 동작을 보여드립니다
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Avatar Preview */}
          <div className="lg:col-span-2">
            <Card className="border-2 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-secondary/30 to-secondary/10 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('/3d-avatar-sign-language.jpg')] bg-cover bg-center opacity-20" />
                  <div className="relative z-10 text-center space-y-6">
                    <div
                      className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${avatars[selectedAvatar].color} flex items-center justify-center shadow-2xl border-4 border-background`}
                    >
                      <Bot className="w-16 h-16 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{avatars[selectedAvatar].name}</h3>
                      <p className="text-muted-foreground">{avatars[selectedAvatar].description}</p>
                    </div>
                    <Button size="lg" className="gap-2 rounded-full shadow-lg h-12 px-8">
                      <Play className="w-5 h-5" />
                      수화 시연 시작
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Control Panel */}
            <Card className="mt-6 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-primary" />
                  아바타 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">재생 속도</Label>
                  <div className="flex items-center gap-4">
                    <Slider value={speed} onValueChange={setSpeed} min={0.5} max={2} step={0.1} className="flex-1" />
                    <span className="text-sm font-mono w-12 text-right">{speed[0].toFixed(1)}x</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">배경 표시</Label>
                    <p className="text-sm text-muted-foreground">아바타 뒤 배경을 표시합니다</p>
                  </div>
                  <Switch checked={showBackground} onCheckedChange={setShowBackground} />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button variant="outline" className="gap-2 rounded-xl h-11 bg-transparent">
                    <Settings className="w-4 h-4" />
                    고급 설정
                  </Button>
                  <Button variant="outline" className="gap-2 rounded-xl h-11 bg-transparent">
                    <Download className="w-4 h-4" />
                    영상 저장
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Avatar Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">아바타 선택</h3>
            <div className="space-y-3">
              {avatars.map((avatar) => (
                <Card
                  key={avatar.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedAvatar === avatar.id ? "border-2 border-primary shadow-xl" : "border"
                  }`}
                  onClick={() => setSelectedAvatar(avatar.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${avatar.color} flex items-center justify-center shadow-lg`}
                      >
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">{avatar.name}</h4>
                        <p className="text-sm text-muted-foreground">{avatar.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features */}
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-chart-1/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-primary" />
                  주요 기능
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Play className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">실시간 재생</p>
                    <p className="text-xs text-muted-foreground">자연스러운 동작으로 표현</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sliders className="w-4 h-4 text-chart-2" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">속도 조절</p>
                    <p className="text-xs text-muted-foreground">학습 수준에 맞게 조정</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-chart-4/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Palette className="w-4 h-4 text-chart-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">다양한 스타일</p>
                    <p className="text-xs text-muted-foreground">취향에 맞는 아바타 선택</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
