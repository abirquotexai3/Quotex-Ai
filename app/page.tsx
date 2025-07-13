"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ExternalLink,
  TrendingUp,
  Lock,
  Zap,
  Shield,
  Sparkles,
  ArrowUp,
  ArrowDown,
  DollarSign,
  BarChart3,
  Timer,
  Target,
  User,
  Bell,
  Trophy,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Send,
  Users,
  Activity,
  PieChart,
  LineChart,
} from "lucide-react"

interface TradingHistory {
  id: string
  market: string
  prediction: "UP" | "DOWN"
  result: "WIN" | "LOSS" | "PENDING"
  confidence: number
  timestamp: Date
  profit?: number
}

interface UserProfile {
  name: string
  level: string
  totalTrades: number
  winRate: number
  totalProfit: number
  avatar: string
}

export default function AiV4App() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "main" | "loading" | "trading" | "profile" | "admin">(
    "login",
  )
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<"UP" | "DOWN" | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [currentMarket, setCurrentMarket] = useState("USD/BRL OTC")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [tradingHistory, setTradingHistory] = useState<TradingHistory[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "VIP Trader",
    level: "Premium",
    totalTrades: 147,
    winRate: 87.2,
    totalProfit: 2847.5,
    avatar: "VT",
  })

  const forexMarkets = [
    "EUR/USD OTC",
    "GBP/USD OTC",
    "USD/JPY OTC",
    "USD/CHF OTC",
    "AUD/USD OTC",
    "USD/CAD OTC",
    "NZD/USD OTC",
    "EUR/GBP OTC",
    "EUR/JPY OTC",
    "GBP/JPY OTC",
    "USD/BRL OTC",
    "EUR/AUD OTC",
    "GBP/AUD OTC",
    "USD/CNY OTC",
    "EUR/CHF OTC",
    "AUD/JPY OTC",
    "CAD/JPY OTC",
    "CHF/JPY OTC",
    "EUR/CAD OTC",
    "GBP/CHF OTC",
    "NZD/JPY OTC",
    "AUD/CAD OTC",
  ]

  const playSound = (type: "click" | "success" | "notification") => {
    if (!soundEnabled) return
    // In a real app, you would play actual audio files
    console.log(`Playing ${type} sound`)
  }

  const sendTelegramSignal = async (market: string, prediction: "UP" | "DOWN", confidence: number) => {
    // Simulate Telegram API call
    console.log(`Sending to Telegram: ${market} - ${prediction} (${confidence}% confidence)`)
    if (notifications) {
      // In a real app, this would send to actual Telegram bot
      setTimeout(() => {
        alert(`📱 Signal sent to Telegram: ${market} ${prediction}`)
      }, 1000)
    }
  }

  const checkPassword = () => {
    if (password === "AI3") {
      setCurrentScreen("main")
      playSound("success")
    } else if (password === "ADMIN123") {
      setCurrentScreen("admin")
      playSound("success")
    } else {
      alert("❌ Wrong password!")
      playSound("click")
    }
  }

  const showLoader = () => {
    setCurrentScreen("loading")
    setIsLoading(true)
    playSound("click")

    setTimeout(() => {
      setCurrentScreen("trading")
      generatePrediction()
    }, 3000)
  }

  const generatePrediction = () => {
    const predictions = ["UP", "DOWN"] as const
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)]
    const randomConfidence = Math.floor(Math.random() * 25) + 75
    const randomMarket = forexMarkets[Math.floor(Math.random() * forexMarkets.length)]

    setPrediction(randomPrediction)
    setConfidence(randomConfidence)
    setCurrentMarket(randomMarket)
    setTimeLeft(60)

    // Add to trading history
    const newTrade: TradingHistory = {
      id: Date.now().toString(),
      market: randomMarket,
      prediction: randomPrediction,
      result: "PENDING",
      confidence: randomConfidence,
      timestamp: new Date(),
    }
    setTradingHistory((prev) => [newTrade, ...prev.slice(0, 9)])

    // Send to Telegram
    sendTelegramSignal(randomMarket, randomPrediction, randomConfidence)
    playSound("notification")

    // Simulate result after 60 seconds
    setTimeout(() => {
      const isWin = Math.random() > 0.3 // 70% win rate
      setTradingHistory((prev) =>
        prev.map((trade) =>
          trade.id === newTrade.id
            ? {
                ...trade,
                result: isWin ? "WIN" : "LOSS",
                profit: isWin ? Math.random() * 100 + 50 : -(Math.random() * 50 + 25),
              }
            : trade,
        ),
      )
    }, 60000)
  }

  const changeMarket = () => {
    const randomMarket = forexMarkets[Math.floor(Math.random() * forexMarkets.length)]
    setCurrentMarket(randomMarket)
    playSound("click")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkPassword()
    }
  }

  useEffect(() => {
    if (currentScreen === "trading" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      generatePrediction()
    }
  }, [currentScreen, timeLeft])

  const themeClass = darkMode ? "dark" : ""

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" : "bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50"} flex items-center justify-center p-4 ${themeClass}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 ${darkMode ? "bg-purple-500" : "bg-blue-400"} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 ${darkMode ? "bg-cyan-500" : "bg-purple-400"} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 ${darkMode ? "bg-emerald-500" : "bg-cyan-400"} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500`}
        ></div>
      </div>

      {/* Login Screen */}
      {currentScreen === "login" && (
        <Card
          className={`w-full max-w-md ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-xl border-purple-500/30 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500`}
        >
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                AI V4
              </h1>
              <div
                className={`flex items-center justify-center gap-2 ${darkMode ? "text-purple-300" : "text-purple-600"}`}
              >
                <Shield className="w-4 h-4" />
                <p className="text-sm">Only for Quotex AI 3.0 VIP</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? "text-purple-400" : "text-purple-600"}`}
                />
                <Input
                  type="password"
                  placeholder="Enter password (AI3 or ADMIN123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`pl-10 ${darkMode ? "bg-black/50 border-purple-500/50 text-white" : "bg-white/50 border-purple-300 text-gray-800"} placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20`}
                />
              </div>

              <Button
                onClick={checkPassword}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Connect AI
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Screen */}
      {currentScreen === "main" && (
        <Card
          className={`w-full max-w-md ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-xl border-emerald-500/30 shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500`}
        >
          <CardContent className="p-8 text-center space-y-6">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"} mb-2`}>AI Connected</h2>
              <p className={`${darkMode ? "text-emerald-300" : "text-emerald-600"} text-sm`}>
                Ready for trading operations
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="https://market-qx.pro/sign-up/?lid=1276982"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="outline"
                  className={`w-full border-emerald-500/50 ${darkMode ? "text-emerald-400 hover:bg-emerald-500/10" : "text-emerald-600 hover:bg-emerald-50"} hover:border-emerald-400 transition-all duration-300 transform hover:scale-105 py-3 bg-transparent`}
                  onClick={() => playSound("click")}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Connect Your Account
                </Button>
              </a>

              <Button
                onClick={showLoader}
                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Buy and Sell
              </Button>

              <Button
                onClick={() => {
                  setCurrentScreen("profile")
                  playSound("click")
                }}
                variant="outline"
                className={`w-full border-purple-500/50 ${darkMode ? "text-purple-400 hover:bg-purple-500/10" : "text-purple-600 hover:bg-purple-50"} hover:border-purple-400 transition-all duration-300 transform hover:scale-105 py-3 bg-transparent`}
              >
                <User className="w-5 h-5 mr-2" />
                User Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading Screen */}
      {currentScreen === "loading" && (
        <Card
          className={`w-full max-w-md ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-xl border-cyan-500/30 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500`}
        >
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-4 animate-spin">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"} mb-2`}>Processing</h2>
            </div>

            <div className="space-y-4">
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
              <p className={`${darkMode ? "text-cyan-300" : "text-cyan-600"}`}>Analyzing market data...</p>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Please wait while AI processes your request
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trading Screen */}
      {currentScreen === "trading" && (
        <Card
          className={`w-full max-w-4xl ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-xl border-yellow-500/30 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500`}
        >
          <CardContent className="p-8">
            <Tabs defaultValue="trading" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="trading">Trading</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="trading" className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"} mb-2`}>
                    Binary Trading AI
                  </h2>
                  <div
                    className={`flex items-center justify-center gap-2 ${darkMode ? "text-yellow-300" : "text-yellow-600"}`}
                  >
                    <DollarSign className="w-4 h-4" />
                    <button
                      onClick={changeMarket}
                      className={`text-lg font-semibold ${darkMode ? "hover:text-yellow-200" : "hover:text-yellow-500"} transition-colors cursor-pointer border-b border-dashed border-yellow-400/50 hover:border-yellow-200`}
                    >
                      {currentMarket}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Prediction Display */}
                  <div
                    className={`${darkMode ? "bg-black/60" : "bg-white/60"} rounded-xl p-6 border border-yellow-500/20`}
                  >
                    <div className="text-center mb-4">
                      <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"} mb-2`}>
                        Next Candle Prediction
                      </h3>
                      <div
                        className={`flex items-center justify-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                      >
                        <Timer className="w-4 h-4" />
                        <span>Next signal in: {timeLeft}s</span>
                      </div>
                    </div>

                    {prediction && (
                      <div className="space-y-4">
                        <div
                          className={`flex items-center justify-center gap-3 p-4 rounded-lg ${
                            prediction === "UP"
                              ? "bg-green-500/20 border border-green-500/30"
                              : "bg-red-500/20 border border-red-500/30"
                          }`}
                        >
                          {prediction === "UP" ? (
                            <ArrowUp className="w-8 h-8 text-green-400" />
                          ) : (
                            <ArrowDown className="w-8 h-8 text-red-400" />
                          )}
                          <div className="text-center">
                            <div
                              className={`text-2xl font-bold ${prediction === "UP" ? "text-green-400" : "text-red-400"}`}
                            >
                              {prediction}
                            </div>
                            <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Direction</div>
                          </div>
                        </div>

                        <div className={`${darkMode ? "bg-black/40" : "bg-white/40"} rounded-lg p-4`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`${darkMode ? "text-white" : "text-gray-800"} font-medium`}>
                              AI Confidence
                            </span>
                            <span className="text-cyan-400 font-bold">{confidence}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                              className="h-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000"
                              style={{ width: `${confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Trading Statistics */}
                  <div
                    className={`${darkMode ? "bg-black/60" : "bg-white/60"} rounded-xl p-6 border border-yellow-500/20`}
                  >
                    <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"} mb-4`}>
                      Today's Performance
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Win Rate</span>
                        <span className="text-green-400 font-bold">{userProfile.winRate}%</span>
                      </div>
                      <Progress value={userProfile.winRate} className="h-2" />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className={`${darkMode ? "bg-black/40" : "bg-white/40"} rounded-lg p-3 text-center`}>
                          <div className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Total Trades</div>
                          <div className={`${darkMode ? "text-white" : "text-gray-800"} font-semibold`}>
                            {userProfile.totalTrades}
                          </div>
                        </div>
                        <div className={`${darkMode ? "bg-black/40" : "bg-white/40"} rounded-lg p-3 text-center`}>
                          <div className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Profit</div>
                          <div className="text-green-400 font-semibold">${userProfile.totalProfit}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    onClick={changeMarket}
                    variant="outline"
                    className={`border-yellow-500/50 ${darkMode ? "text-yellow-400 hover:bg-yellow-500/10" : "text-yellow-600 hover:bg-yellow-50"} hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 py-3 bg-transparent`}
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Change Market
                  </Button>
                  <Button
                    onClick={generatePrediction}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <Target className="w-5 h-5 mr-2" />
                    Generate Signal
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentScreen("main")
                      playSound("click")
                    }}
                    variant="outline"
                    className={`border-gray-500/50 ${darkMode ? "text-gray-300 hover:bg-gray-500/10" : "text-gray-600 hover:bg-gray-50"} hover:border-gray-400 transition-all duration-300`}
                  >
                    Back to Main
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"} mb-4`}>
                  Trading History
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {tradingHistory.map((trade) => (
                    <div
                      key={trade.id}
                      className={`${darkMode ? "bg-black/40" : "bg-white/40"} rounded-lg p-4 border border-gray-500/20`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              trade.result === "WIN"
                                ? "bg-green-400"
                                : trade.result === "LOSS"
                                  ? "bg-red-400"
                                  : "bg-yellow-400"
                            }`}
                          ></div>
                          <div>
                            <div className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                              {trade.market}
                            </div>
                            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                              {trade.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`flex items-center gap-1 ${
                              trade.prediction === "UP" ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {trade.prediction === "UP" ? (
                              <ArrowUp className="w-4 h-4" />
                            ) : (
                              <ArrowDown className="w-4 h-4" />
                            )}
                            {trade.prediction}
                          </div>
                          <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {trade.confidence}%
                          </div>
                          {trade.profit && (
                            <div
                              className={`text-sm font-semibold ${trade.profit > 0 ? "text-green-400" : "text-red-400"}`}
                            >
                              {trade.profit > 0 ? "+" : ""}${trade.profit.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="charts" className="space-y-4">
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"} mb-4`}>Live Charts</h3>
                <div
                  className={`${darkMode ? "bg-black/40" : "bg-white/40"} rounded-xl p-6 border border-gray-500/20 h-96 flex items-center justify-center`}
                >
                  <div className="text-center">
                    <LineChart className={`w-16 h-16 ${darkMode ? "text-gray-400" : "text-gray-600"} mx-auto mb-4`} />
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Live candlestick charts for {currentMarket}
                    </p>
                    <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"} mt-2`}>
                      Chart integration coming soon...
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"} mb-4`}>Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                      <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>Sound Effects</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSoundEnabled(!soundEnabled)
                        playSound("click")
                      }}
                    >
                      {soundEnabled ? "ON" : "OFF"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>Dark Mode</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDarkMode(!darkMode)
                        playSound("click")
                      }}
                    >
                      {darkMode ? "ON" : "OFF"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5" />
                      <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>Push Notifications</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setNotifications(!notifications)
                        playSound("click")
                      }}
                    >
                      {notifications ? "ON" : "OFF"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Send className="w-5 h-5" />
                      <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>Telegram Integration</span>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* User Profile Screen */}
      {currentScreen === "profile" && (
        <Card
          className={`w-full max-w-2xl ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-xl border-purple-500/30 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500`}
        >
          <CardHeader>
            <CardTitle className={`text-center ${darkMode ? "text-white" : "text-gray-800"}`}>User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
                  {userProfile.avatar}
                </AvatarFallback>
              </Avatar>
              <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{userProfile.name}</h2>
              <Badge className="mt-2">{userProfile.level} Member</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className={`${darkMode ? "bg-black/40" : "bg-white/40"} border-green-500/30`}>
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">{userProfile.winRate}%</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Win Rate</div>
                </CardContent>
              </Card>

              <Card className={`${darkMode ? "bg-black/40" : "bg-white/40"} border-blue-500/30`}>
                <CardContent className="p-4 text-center">
                  <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">{userProfile.totalTrades}</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Total Trades</div>
                </CardContent>
              </Card>

              <Card className={`${darkMode ? "bg-black/40" : "bg-white/40"} border-yellow-500/30`}>
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-400">${userProfile.totalProfit}</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Total Profit</div>
                </CardContent>
              </Card>
            </div>

            <Button
              onClick={() => {
                setCurrentScreen("main")
                playSound("click")
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
            >
              Back to Main
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Admin Dashboard */}
      {currentScreen === "admin" && (
        <Card
          className={`w-full max-w-6xl ${darkMode ? "bg-black/40" : "bg-white/40"} backdrop-blur-xl border-red-500/30 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500`}
        >
          <CardHeader>
            <CardTitle className={`text-center ${darkMode ? "text-white" : "text-gray-800"} text-2xl`}>
              <Shield className="w-8 h-8 inline mr-2" />
              Admin Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="signals">Signals</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className={`${darkMode ? "bg-black/40" : "bg-white/40"} border-green-500/30`}>
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-400">1,247</div>
                      <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Active Users</div>
                    </CardContent>
                  </Card>

                  <Card className={`${darkMode ? "bg-black/40" : "bg-white/40"} border-blue-500/30`}>
                    <CardContent className="p-4 text-center">
                      <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-400">89.3%</div>
                      <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Signal Accuracy</div>
                    </CardContent>
                  </Card>

                  <Card className={`${darkMode ? "bg-black/40" : "bg-white/40"} border-yellow-500/30`}>
                    <CardContent className="p-4 text-center">
                      <Activity className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-400">15,892</div>
                      <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Signals Sent</div>
                    </CardContent>
                  </Card>

                  <Card className={`${darkMode ? "bg-black/40" : "bg-white/40"} border-purple-500/30`}>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-400">$847K</div>
                      <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Total Volume</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="users" className="space-y-4">
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>User Management</h3>
                <div className={`${darkMode ? "bg-black/40" : "bg-white/40"} rounded-xl p-6 border border-gray-500/20`}>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-center`}>
                    User management interface would be here...
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="signals" className="space-y-4">
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Signal Management</h3>
                <div className={`${darkMode ? "bg-black/40" : "bg-white/40"} rounded-xl p-6 border border-gray-500/20`}>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-center`}>
                    Signal configuration and management tools...
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Analytics</h3>
                <div
                  className={`${darkMode ? "bg-black/40" : "bg-white/40"} rounded-xl p-6 border border-gray-500/20 h-96 flex items-center justify-center`}
                >
                  <div className="text-center">
                    <PieChart className={`w-16 h-16 ${darkMode ? "text-gray-400" : "text-gray-600"} mx-auto mb-4`} />
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Advanced analytics dashboard</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <Button
                onClick={() => {
                  setCurrentScreen("main")
                  playSound("click")
                }}
                className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white"
              >
                Exit Admin Panel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
