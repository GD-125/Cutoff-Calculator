"use client"

import { useEffect } from "react"
import { Moon, Sun, Home, ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function SolutionsPage() {
  const { setTheme } = useTheme()

  // Set default theme to light
  useEffect(() => {
    setTheme("light")
  }, [setTheme])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 to-blue-50 dark:from-slate-900 dark:to-indigo-950">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-pink-100 dark:border-indigo-900">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 text-lg font-semibold">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl bg-gradient-to-r from-pink-500 to-violet-500 dark:from-cyan-400 dark:to-pink-400 text-transparent bg-clip-text"
            >
              Cutoff Calculator
            </motion.h1>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-pink-500 dark:hover:text-cyan-400 transition-colors"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link href="/solutions" className="flex items-center gap-1 text-pink-500 dark:text-cyan-400">
                Solutions
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme("dark")}
              className="bg-white/20 dark:bg-transparent border border-slate-200 dark:border-slate-700 hidden dark:flex"
              aria-label="Switch to dark theme"
            >
              <Moon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme("light")}
              className="bg-white/20 dark:bg-transparent border border-slate-200 dark:border-slate-700 flex dark:hidden"
              aria-label="Switch to light theme"
            >
              <Sun className="h-5 w-5 text-amber-500" />
            </Button>
            <div className="md:hidden">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-pink-200 dark:border-indigo-800">
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 dark:from-cyan-400 dark:to-pink-400 text-transparent bg-clip-text">
            Our Solutions
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-slate-600 dark:text-slate-300">
            Explore our range of educational tools designed to help students excel in their academic journey
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div variants={item} className="group">
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="block h-full">
              <Card className="overflow-hidden h-full border-pink-200 dark:border-indigo-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="h-2 bg-gradient-to-r from-pink-500 to-pink-400 dark:from-cyan-500 dark:to-cyan-400"></div>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="relative w-40 h-40">
                      <Image
                        src="/placeholder.svg?height=160&width=160"
                        alt="CGPA Calculator"
                        width={160}
                        height={160}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center text-pink-600 dark:text-cyan-400 mb-4">
                    CGPA Calculator
                  </h2>
                  <p className="text-center text-pink-500 dark:text-pink-300 mb-6">
                    Digital tool that calculates the Cumulative Grade Point Average based on individual grades obtained
                    in various subjects over a period.
                  </p>
                  <div className="flex justify-center">
                    <Button className="bg-gradient-to-r from-pink-500 to-pink-400 dark:from-cyan-500 dark:to-cyan-400 hover:from-pink-600 hover:to-pink-500 dark:hover:from-cyan-600 dark:hover:to-cyan-500 group">
                      Try it now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </a>
          </motion.div>

          <motion.div variants={item} className="group">
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="block h-full">
              <Card className="overflow-hidden h-full border-pink-200 dark:border-indigo-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="h-2 bg-gradient-to-r from-violet-500 to-violet-400 dark:from-blue-500 dark:to-blue-400"></div>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="relative w-40 h-40">
                      <Image
                        src="/placeholder.svg?height=160&width=160"
                        alt="Attendance Tracker"
                        width={160}
                        height={160}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center text-violet-600 dark:text-blue-400 mb-4">
                    Attendance Tracker
                  </h2>
                  <p className="text-center text-violet-500 dark:text-violet-300 mb-6">
                    Digital tool that helps to know the student attendance by calculating attendance over a time for
                    better academic performance insights.
                  </p>
                  <div className="flex justify-center">
                    <Button className="bg-gradient-to-r from-violet-500 to-violet-400 dark:from-blue-500 dark:to-blue-400 hover:from-violet-600 hover:to-violet-500 dark:hover:from-blue-600 dark:hover:to-blue-500 group">
                      Try it now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </a>
          </motion.div>

          <motion.div variants={item} className="group">
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="block h-full">
              <Card className="overflow-hidden h-full border-pink-200 dark:border-indigo-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="h-2 bg-gradient-to-r from-fuchsia-500 to-fuchsia-400 dark:from-pink-500 dark:to-pink-400"></div>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="relative w-40 h-40">
                      <Image
                        src="/placeholder.svg?height=160&width=160"
                        alt="Chatbot"
                        width={160}
                        height={160}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center text-fuchsia-600 dark:text-pink-400 mb-4">Chatbot</h2>
                  <p className="text-center text-fuchsia-500 dark:text-fuchsia-300 mb-6">
                    It is a computer program that simulates human conversation, written or spoken, providing assistance
                    and information to users.
                  </p>
                  <div className="flex justify-center">
                    <Button className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-400 dark:from-pink-500 dark:to-pink-400 hover:from-fuchsia-600 hover:to-fuchsia-500 dark:hover:from-pink-600 dark:hover:to-pink-500 group">
                      Try it now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/">
            <Button
              variant="outline"
              className="border-pink-200 dark:border-indigo-800 hover:bg-pink-100 dark:hover:bg-indigo-900"
            >
              Back to Cutoff Calculator
            </Button>
          </Link>
        </motion.div>
      </main>

      <footer className="py-6 bg-gradient-to-r from-pink-100 to-violet-100 dark:from-slate-900 dark:to-indigo-950 border-t border-pink-200 dark:border-indigo-900">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p whileHover={{ scale: 1.05 }} className="text-center md:text-left">
              Designed and Developed by{" "}
              <span className="relative font-bold group">
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
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-cyan-400 transition-colors"
              >
                CGPA Calculator
              </a>
              <a
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-cyan-400 transition-colors"
              >
                Attendance Tracker
              </a>
              <a
                href="https://www.google.com"
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
