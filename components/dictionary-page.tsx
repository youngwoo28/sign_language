"use client"

import { useState } from "react"
import { Search, BookOpen, Play } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const signLanguageData = [
  {
    id: 1,
    word: "안녕하세요",
    description: "만남의 기본 인사",
    category: "일상",
    videoUrl: "/sign-language-hello.jpg",
    difficulty: "초급",
  },
  {
    id: 2,
    word: "감사합니다",
    description: "고마움을 표현하는 수화",
    category: "일상",
    videoUrl: "/sign-language-thank-you.png",
    difficulty: "초급",
  },
  {
    id: 3,
    word: "사랑해요",
    description: "사랑을 전하는 수화",
    category: "감정",
    videoUrl: "/sign-language-love.jpg",
    difficulty: "초급",
  },
  {
    id: 4,
    word: "도와주세요",
    description: "도움을 요청하는 수화",
    category: "일상",
    videoUrl: "/sign-language-help.png",
    difficulty: "중급",
  },
  {
    id: 5,
    word: "친구",
    description: "친구를 뜻하는 수화",
    category: "관계",
    videoUrl: "/sign-language-friend.jpg",
    difficulty: "초급",
  },
  {
    id: 6,
    word: "가족",
    description: "가족을 표현하는 수화",
    category: "관계",
    videoUrl: "/family-sign-language.jpg",
    difficulty: "초급",
  },
  {
    id: 7,
    word: "학교",
    description: "학교를 뜻하는 수화",
    category: "장소",
    videoUrl: "/school-sign-language.jpg",
    difficulty: "초급",
  },
  {
    id: 8,
    word: "병원",
    description: "병원을 표현하는 수화",
    category: "장소",
    videoUrl: "/hospital-sign-language.jpg",
    difficulty: "중급",
  },
]

const categories = ["전체", "일상", "감정", "관계", "장소"]
const difficulties = ["전체", "초급", "중급", "고급"]

export default function DictionaryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedDifficulty, setSelectedDifficulty] = useState("전체")
  const [searchResults, setSearchResults] = useState<typeof signLanguageData>(signLanguageData)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterResults(query, selectedCategory, selectedDifficulty)
  }

  const filterResults = (query: string, category: string, difficulty: string) => {
    let results = signLanguageData

    if (query.trim()) {
      results = results.filter(
        (item) =>
          item.word.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (category !== "전체") {
      results = results.filter((item) => item.category === category)
    }

    if (difficulty !== "전체") {
      results = results.filter((item) => item.difficulty === difficulty)
    }

    setSearchResults(results)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">수화 사전</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              소통의 언어를 배워요
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            다양한 수화 단어를 검색하고 영상으로 배워보세요
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              type="text"
              placeholder="수화 단어를 검색해보세요..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-14 pr-4 h-14 text-base sm:text-lg rounded-2xl border-2 focus-visible:ring-4 transition-all shadow-lg shadow-primary/5"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-center">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-semibold text-muted-foreground px-2 py-2">카테고리:</span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category)
                  filterResults(searchQuery, category, selectedDifficulty)
                }}
                className="rounded-xl h-9 transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-semibold text-muted-foreground px-2 py-2">난이도:</span>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedDifficulty(difficulty)
                  filterResults(searchQuery, selectedCategory, difficulty)
                }}
                className="rounded-xl h-9 transition-all duration-300"
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {searchResults.length === 0 ? (
          <div className="text-center py-16 sm:py-20 lg:py-24 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-secondary/80 to-secondary/40 flex items-center justify-center border border-border shadow-lg">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">검색 결과가 없습니다</h3>
            <p className="text-muted-foreground text-base sm:text-lg">다른 단어로 검색하거나 필터를 조정해보세요</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 animate-fade-in-up">
            {searchResults.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/40 group cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-secondary/50 to-secondary/20 relative overflow-hidden">
                    <img
                      src={item.videoUrl || "/placeholder.svg"}
                      alt={item.word}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-semibold shadow-lg backdrop-blur-sm bg-background/80"
                      >
                        {item.category}
                      </Badge>
                      <Badge
                        variant={item.difficulty === "초급" ? "default" : "secondary"}
                        className="text-xs font-semibold shadow-lg backdrop-blur-sm"
                      >
                        {item.difficulty}
                      </Badge>
                    </div>
                    <Button
                      size="icon"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl scale-90 group-hover:scale-100"
                    >
                      <Play className="w-8 h-8 ml-1" />
                    </Button>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-xl sm:text-2xl font-bold mb-1 drop-shadow-lg">{item.word}</h3>
                      <p className="text-white/95 text-xs sm:text-sm drop-shadow-md">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
