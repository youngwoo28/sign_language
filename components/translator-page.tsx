"use client"

import { useState } from "react"
import { Sparkles, ArrowRight, Video, Mic, FileText, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TranslatorPage() {
  const [inputText, setInputText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [mode, setMode] = useState<"text" | "voice">("text")

  const handleTranslate = () => {
    if (!inputText.trim()) return

    setIsTranslating(true)
    // Simulate translation
    setTimeout(() => {
      setTranslatedText(
        `[수화 번역 결과]\n"${inputText}"을(를) 수화로 표현하는 방법:\n\n1. 첫 단어를 강조하며 손을 앞으로 내밉니다\n2. 중간 표현은 가슴 앞에서 진행합니다\n3. 마지막 단어는 부드럽게 마무리합니다`,
      )
      setIsTranslating(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-2/10 border border-chart-2/20 mb-2">
            <Sparkles className="w-4 h-4 text-chart-2" />
            <span className="text-sm font-semibold text-chart-2">AI 번역기</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              AI가 수화로 번역해드려요
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            텍스트를 입력하면 AI가 자동으로 수화 표현으로 변환해드립니다
          </p>
        </div>

        {/* Mode Selection */}
        <div className="flex justify-center gap-3">
          <Button
            variant={mode === "text" ? "default" : "outline"}
            onClick={() => setMode("text")}
            className="gap-2 h-11 rounded-2xl px-6 transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            텍스트 입력
          </Button>
          <Button
            variant={mode === "voice" ? "default" : "outline"}
            onClick={() => setMode("voice")}
            className="gap-2 h-11 rounded-2xl px-6 transition-all duration-300"
          >
            <Mic className="w-4 h-4" />
            음성 입력
          </Button>
        </div>

        {/* Translation Interface */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                입력 텍스트
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mode === "text" ? (
                <Textarea
                  placeholder="번역할 내용을 입력하세요..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[200px] text-base resize-none rounded-xl border-2"
                />
              ) : (
                <div className="min-h-[200px] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 bg-secondary/30">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mic className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-center">
                    마이크 버튼을 눌러
                    <br />
                    음성을 입력하세요
                  </p>
                  <Button size="lg" className="rounded-full gap-2">
                    <Mic className="w-5 h-5" />
                    녹음 시작
                  </Button>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{inputText.length} 글자</span>
                <Button
                  onClick={handleTranslate}
                  disabled={!inputText.trim() || isTranslating}
                  className="gap-2 rounded-xl"
                >
                  {isTranslating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      번역 중...
                    </>
                  ) : (
                    <>
                      번역하기
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Card */}
          <Card className="border-2 shadow-xl bg-gradient-to-br from-card to-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-chart-2" />
                수화 번역 결과
              </CardTitle>
            </CardHeader>
            <CardContent>
              {translatedText ? (
                <div className="space-y-4">
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-chart-1/10 border-2 border-primary/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/sign-language-avatar-translating.jpg')] bg-cover bg-center opacity-50" />
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30">
                        <Video className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">수화 영상 시연</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-background border-2">
                    <p className="text-sm whitespace-pre-line leading-relaxed">{translatedText}</p>
                  </div>
                </div>
              ) : (
                <div className="min-h-[340px] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 bg-background/50">
                  <div className="w-20 h-20 rounded-full bg-chart-2/10 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-chart-2" />
                  </div>
                  <p className="text-muted-foreground text-center">
                    텍스트를 입력하고
                    <br />
                    번역 버튼을 눌러주세요
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4">
          <Card className="border shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold">실시간 번역</h3>
              <p className="text-sm text-muted-foreground">입력과 동시에 빠르게 번역됩니다</p>
            </CardContent>
          </Card>
          <Card className="border shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-chart-2/10 flex items-center justify-center mb-3">
                <Video className="w-6 h-6 text-chart-2" />
              </div>
              <h3 className="font-bold">영상 시연</h3>
              <p className="text-sm text-muted-foreground">수화 동작을 영상으로 확인하세요</p>
            </CardContent>
          </Card>
          <Card className="border shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-chart-4/10 flex items-center justify-center mb-3">
                <Mic className="w-6 h-6 text-chart-4" />
              </div>
              <h3 className="font-bold">음성 지원</h3>
              <p className="text-sm text-muted-foreground">말하면 자동으로 텍스트로 변환</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
