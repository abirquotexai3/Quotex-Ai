"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, TrendingUp, Lock, Zap, Shield, Sparkles } from "lucide-react"

export default function AiV4App() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "main" | "loading">("login")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const checkPassword = () => {
    if (password === "AI3") {
      setCurrentScreen("main")
    } else {
      alert("❌ Wrong password!")
    }
  }

  const showLoader = () => {
    setCurrentScreen("loading")
    setIsLoading(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkPassword()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Login Screen */}
      {currentScreen === "login" && (
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-purple-500/30 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500">
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                AI V4
              </h1>
              <div className="flex items-center justify-center gap-2 text-purple-300">
                <Shield className="w-4 h-4" />
                <p className="text-sm">Only for Quotex AI 3.0 VIP</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 bg-black/50 border-purple-500/50 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
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
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-emerald-500/30 shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <CardContent className="p-8 text-center space-y-6">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">AI Connected</h2>
              <p className="text-emerald-300 text-sm">Ready for trading operations</p>
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
                  className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-300 transform hover:scale-105 py-3 bg-transparent"
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
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading Screen */}
      {currentScreen === "loading" && (
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-cyan-500/30 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-4 animate-spin">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Processing</h2>
            </div>

            <div className="space-y-4">
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-cyan-300">Analyzing market data...</p>
              <p className="text-sm text-gray-400">Please wait while AI processes your request</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
