"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Moon, Sun, Home, BookOpen, Camera, Mail } from "lucide-react"
import { useTheme } from "next-themes"
import Confetti from "react-confetti"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import html2canvas from "html2canvas"
import { toast } from "@/components/ui/use-toast"

export default function CutoffCalculator() {
  const [maths, setMaths] = useState<string>("")
  const [physics, setPhysics] = useState<string>("")
  const [chemistry, setChemistry] = useState<string>("")
  const [mathsError, setMathsError] = useState<string>("")
  const [physicsError, setPhysicsError] = useState<string>("")
  const [chemistryError, setChemistryError] = useState<string>("")
  const [cutoff, setCutoff] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })
  const calculatorRef = useRef<HTMLDivElement>(null)
  const [isScreenshotting, setIsScreenshotting] = useState(false)

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Set default theme to light
  useEffect(() => {
    if (mounted) {
      setTheme("light")
    }
  }, [mounted, setTheme])

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const validateInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    // Only allow numbers and a single decimal point
    const regex = /^(\d{0,3})(\.)?(\d{0,1})?$/
    if (regex.test(value)) {
      // Check if the value is within the range 0-100
      const numValue = Number.parseFloat(value || "0")
      if (numValue <= 100) {
        setter("")
        return value
      } else {
        setter("Value must be between 0 and 100")
        return value
      }
    }
    setter("Only numbers and decimal point allowed")
    return ""
  }

  const handleMathsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMaths(validateInput(value, setMathsError))
  }

  const handlePhysicsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhysics(validateInput(value, setPhysicsError))
  }

  const handleChemistryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setChemistry(validateInput(value, setChemistryError))
  }

  const calculateCutoff = () => {
    if (maths !== "" && physics !== "" && chemistry !== "" && !mathsError && !physicsError && !chemistryError) {
      const cutoffValue = (Number.parseFloat(physics) + Number.parseFloat(chemistry)) / 2 + Number.parseFloat(maths)
      setCutoff(cutoffValue)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 12000) // 12 seconds
    } else {
      toast({
        title: "Invalid Input",
        description: "Please correct the errors in your input fields.",
        variant: "destructive",
      })
    }
  }

  const getColorClass = (cutoffValue: number) => {
    if (cutoffValue >= 180) return "text-blue-600 dark:text-blue-400"
    if (cutoffValue >= 150) return "text-violet-600 dark:text-violet-400"
    if (cutoffValue >= 130) return "text-emerald-600 dark:text-emerald-400"
    if (cutoffValue >= 100) return "text-amber-600 dark:text-amber-500"
    return "text-rose-600 dark:text-rose-400"
  }

  const getMotivationalMessage = (cutoffValue: number) => {
    if (cutoffValue >= 180) return "Exceptional! You're destined for greatness! 🌟"
    if (cutoffValue >= 150) return "Fantastic work! Keep shining bright! ✨"
    if (cutoffValue >= 130) return "Great job! You're on the right path! 🚀"
    if (cutoffValue >= 100) return "Good effort! Keep pushing forward! 💪"
    return "You've got potential! Keep working hard! 📚"
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const takeScreenshot = async () => {
    if (calculatorRef.current) {
      setIsScreenshotting(true)
      try {
        // Improve screenshot quality
        const canvas = await html2canvas(calculatorRef.current, {
          scale: 2, // Increase scale for better quality
          useCORS: true,
          logging: false,
          backgroundColor: null,
        })

        const image = canvas.toDataURL("image/png", 1.0) // Use maximum quality
        const link = document.createElement("a")
        link.href = image
        link.download = "cutoff-calculator-result.png"
        link.click()

        toast({
          title: "Screenshot Saved!",
          description: "Your cutoff result has been saved as an image.",
        })
      } catch (error) {
        console.error("Error taking screenshot:", error)
        toast({
          title: "Screenshot Failed",
          description: "There was an error taking the screenshot.",
          variant: "destructive",
        })
      }
      setIsScreenshotting(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 to-blue-50 dark:from-slate-900 dark:to-indigo-950">
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} recycle={true} numberOfPieces={500} />
      )}

      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-pink-100 dark:border-indigo-900">
        <div className="container flex h-16 items-center justify-between">
          <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 dark:from-cyan-400 dark:to-pink-400 text-transparent bg-clip-text">
            Cutoff Calculator
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-pink-500 dark:hover:text-cyan-400 transition-colors"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/solutions"
                className="flex items-center gap-1 hover:text-pink-500 dark:hover:text-cyan-400 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Solutions
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="bg-white/20 dark:bg-transparent border border-slate-200 dark:border-slate-700"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-amber-500" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700" />
                )}
              </Button>
            </nav>
            <div className="md:hidden flex items-center gap-2">
              <Link href="/solutions">
                <Button variant="outline" size="sm" className="border-pink-200 dark:border-indigo-800">
                  Solutions
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="bg-white/20 dark:bg-transparent border border-slate-200 dark:border-slate-700"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-amber-500" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <section className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 dark:from-cyan-400 dark:to-pink-400 text-transparent bg-clip-text">
            What is Cutoff?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/70 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-pink-100 dark:border-indigo-900 hover:shadow-xl transition-all duration-300">
              <p className="mb-4">
                A cutoff is a minimum score required for admission to various engineering colleges and programs. It's a
                standardized way to evaluate and rank students based on their performance in key subjects.
              </p>
              <h3 className="text-xl font-semibold mb-2 text-pink-600 dark:text-cyan-400">
                How is it used in Engineering?
              </h3>
              <p className="mb-4">In engineering admissions, the cutoff score is crucial as it:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Determines eligibility for specific engineering programs</li>
                <li>Ranks students for seat allocation in prestigious institutions</li>
                <li>Serves as a benchmark for scholarship opportunities</li>
                <li>Helps in streamlining the admission process for thousands of applicants</li>
              </ul>
            </div>
            <div className="bg-white/70 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-pink-100 dark:border-indigo-900 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-2 text-violet-600 dark:text-pink-400">
                How to Calculate Cutoff?
              </h3>
              <p className="mb-4">The engineering cutoff is typically calculated using the formula:</p>
              <div className="bg-gradient-to-r from-pink-100 to-violet-100 dark:from-slate-700 dark:to-indigo-900 p-4 rounded-md mb-4 hover:scale-105 transition-transform duration-300">
                <p className="font-mono text-center">Cutoff = Mathematics + (Physics + Chemistry) ÷ 2</p>
              </div>
              <p>
                This formula gives more weightage to Mathematics while also considering the average performance in
                Physics and Chemistry, reflecting the importance of these subjects in engineering education.
              </p>
            </div>
          </div>
        </section>

        <section id="calculator" className="mb-10 animate-fade-in" ref={calculatorRef}>
          <Card className="overflow-hidden border-pink-200 dark:border-indigo-800 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 dark:from-cyan-500 dark:via-blue-500 dark:to-pink-500"></div>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 dark:from-cyan-400 dark:to-pink-400 text-transparent bg-clip-text">
                  Calculate Your Cutoff
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={takeScreenshot}
                  disabled={isScreenshotting}
                  className="flex items-center gap-1 border-pink-200 dark:border-indigo-800 hover:bg-pink-100 dark:hover:bg-indigo-900"
                >
                  <Camera className="h-4 w-4" />
                  {isScreenshotting ? "Processing..." : "Save"}
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label htmlFor="maths" className="font-medium">
                      Mathematics:
                    </label>
                    <div className="space-y-1">
                      <Input
                        id="maths"
                        type="text"
                        inputMode="decimal"
                        value={maths}
                        onChange={handleMathsChange}
                        placeholder="Enter marks (0-100)"
                        className={`border-pink-200 dark:border-indigo-800 focus:ring-pink-500 dark:focus:ring-cyan-500 ${
                          mathsError ? "border-red-500 dark:border-red-500" : ""
                        }`}
                      />
                      {mathsError && <p className="text-xs text-red-500">{mathsError}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label htmlFor="physics" className="font-medium">
                      Physics:
                    </label>
                    <div className="space-y-1">
                      <Input
                        id="physics"
                        type="text"
                        inputMode="decimal"
                        value={physics}
                        onChange={handlePhysicsChange}
                        placeholder="Enter marks (0-100)"
                        className={`border-pink-200 dark:border-indigo-800 focus:ring-pink-500 dark:focus:ring-cyan-500 ${
                          physicsError ? "border-red-500 dark:border-red-500" : ""
                        }`}
                      />
                      {physicsError && <p className="text-xs text-red-500">{physicsError}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label htmlFor="chemistry" className="font-medium">
                      Chemistry:
                    </label>
                    <div className="space-y-1">
                      <Input
                        id="chemistry"
                        type="text"
                        inputMode="decimal"
                        value={chemistry}
                        onChange={handleChemistryChange}
                        placeholder="Enter marks (0-100)"
                        className={`border-pink-200 dark:border-indigo-800 focus:ring-pink-500 dark:focus:ring-cyan-500 ${
                          chemistryError ? "border-red-500 dark:border-red-500" : ""
                        }`}
                      />
                      {chemistryError && <p className="text-xs text-red-500">{chemistryError}</p>}
                    </div>
                  </div>
                  <div>
                    <Button
                      onClick={calculateCutoff}
                      className="w-full bg-gradient-to-r from-pink-500 to-violet-500 dark:from-cyan-500 dark:to-pink-500 hover:from-pink-600 hover:to-violet-600 dark:hover:from-cyan-600 dark:hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      disabled={
                        maths === "" ||
                        physics === "" ||
                        chemistry === "" ||
                        !!mathsError ||
                        !!physicsError ||
                        !!chemistryError
                      }
                    >
                      Calculate Cutoff
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  {cutoff !== null && (
                    <div className="text-center animate-fade-in">
                      <h3 className="text-xl font-semibold mb-2">Your Cutoff Score:</h3>
                      <p className={`text-5xl font-bold animate-pulse ${getColorClass(cutoff)}`}>{cutoff.toFixed(1)}</p>
                      <div className="mt-4">
                        <p className={`font-semibold text-lg ${getColorClass(cutoff)}`}>
                          {getMotivationalMessage(cutoff)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 dark:from-cyan-400 dark:to-pink-400 text-transparent bg-clip-text">
            Our Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group">
              <Card className="overflow-hidden h-full border-pink-200 dark:border-indigo-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="h-2 bg-gradient-to-r from-pink-500 to-pink-400 dark:from-cyan-500 dark:to-cyan-400"></div>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-pink-600 dark:text-cyan-400">CGPA Calculator</h3>
                    <svg
                      className="w-6 h-6 text-pink-500 dark:text-cyan-400 group-hover:rotate-12 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Digital tool that calculates the Cumulative Grade Point Average based on individual grades obtained
                    in various subjects over a period.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-xs font-medium text-pink-500 dark:text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      Published
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="overflow-hidden h-full border-pink-200 dark:border-indigo-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="h-2 bg-gradient-to-r from-violet-500 to-violet-400 dark:from-blue-500 dark:to-blue-400"></div>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-violet-600 dark:text-blue-400">Attendance Tracker</h3>
                    <svg
                      className="w-6 h-6 text-violet-500 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Digital tool that helps to know the student attendance by calculating attendance over a time for
                    better academic performance insights.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-xs font-medium text-violet-500 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      Published
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="overflow-hidden h-full border-pink-200 dark:border-indigo-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="h-2 bg-gradient-to-r from-fuchsia-500 to-fuchsia-400 dark:from-pink-500 dark:to-pink-400"></div>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-fuchsia-600 dark:text-pink-400">Chatbot</h3>
                    <svg
                      className="w-6 h-6 text-fuchsia-500 dark:text-pink-400 group-hover:rotate-12 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    It is a computer program that simulates human conversation, written or spoken, providing assistance
                    and information to users.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-xs font-medium text-fuchsia-500 dark:text-pink-400 flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      Coming soon
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-white/70 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-pink-100 dark:border-indigo-900 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full">
                <Mail className="h-6 w-6 text-pink-500 dark:text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Have any queries?</h3>
                <p className="text-slate-600 dark:text-slate-400">We're here to help you!</p>
              </div>
            </div>
            <div className="flex items-center">
              <a
                href="mailto:techy5788@gmail.com" 
                className="bg-gradient-to-r from-pink-500 to-violet-500 dark:from-cyan-500 dark:to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Send an email: techy5788@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 bg-gradient-to-r from-pink-100 to-violet-100 dark:from-slate-900 dark:to-indigo-950 border-t border-pink-200 dark:border-indigo-900">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p whileHover={{ scale: 1.05 }} className="text-center md:text-left">
              Designed and Developed by{" "}
              <span className="relative font-bold">
                <span className="bg-gradient-to-r from-pink-500 to-violet-500 dark:from-cyan-400 dark:to-pink-400 text-transparent bg-clip-text">
                  DevQueen
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-violet-500 dark:from-cyan-400 dark:to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </motion.p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <Link
                href="/solutions"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-cyan-400 transition-colors"
              >
                Solutions
              </Link>
              <a
                href="https://gpa-calculator-sigma-inky.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-cyan-400 transition-colors"
              >
                CGPA Calculator
              </a>
              <a
                href="https://attendance-calculator-pinky.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-cyan-400 transition-colors"
              >
                Attendance Tracker
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-cyan-400 transition-colors"
              >
                Chatbot
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
