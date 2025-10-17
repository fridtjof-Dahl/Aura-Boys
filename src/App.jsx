import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  ArrowRight,
  Copy,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Eye,
  Zap,
  Brain,
  Twitter,
  MessageCircle,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Coins,
  Flame,
  FileCode,
  Rocket,
  Check,
  Menu,
  X
} from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [currentPrice, setCurrentPrice] = useState(0.00042)
  const [priceChange, setPriceChange] = useState(12.5)
  const [copied, setCopied] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { scrollYProgress } = useScroll()

  // Contract address
  const contractAddress = "GuLHswrk82GcpBdEBmtihdEw749XyGJgRLHPcTtSpump"

  // Mouse tracking for aura effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Price simulation - Disabled until API integration
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const change = (Math.random() - 0.5) * 0.000005
  //     setCurrentPrice(prev => Math.max(0, prev + change))
  //     setPriceChange(prev => prev + (Math.random() - 0.5) * 0.5)
  //   }, 5000)
  //   return () => clearInterval(interval)
  // }, [])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative font-['Inter']">
      {/* Dynamic Aura Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main aura that follows mouse */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04]"
          style={{
            background: `radial-gradient(circle, 
              rgba(255, 215, 0, 0.8) 0%, 
              rgba(255, 165, 0, 0.6) 20%,
              rgba(139, 69, 255, 0.4) 40%, 
              rgba(255, 0, 255, 0.3) 60%, 
              rgba(0, 255, 255, 0.2) 80%, 
              transparent 100%)`,
            filter: 'blur(100px)',
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Static ambient auras */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 69, 255, 0.6) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-2xl border-b border-yellow-500/10">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <motion.div 
                className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-40"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <span className="text-lg font-bold tracking-wider text-yellow-400">AURA BOYS</span>
          </motion.div>
          
          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            {[
              { label: 'About', id: 'about' },
              { label: 'Mantra', id: 'mantra' },
              { label: 'Tokenomics', id: 'tokenomics' },
              { label: 'Roadmap', id: 'roadmap' },
              { label: 'Community', id: 'community' }
            ].map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/70 hover:text-yellow-400 transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"
                />
              </motion.button>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white/70 hover:text-yellow-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>

          {/* Desktop CTA */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <Button 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-semibold"
              onClick={() => window.open('https://pump.fun/coin/GuLHswrk82GcpBdEBmtihdEw749XyGJgRLHPcTtSpump', '_blank')}
            >
              Buy $AURA
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-xl border-t border-yellow-500/10"
            >
              <div className="container mx-auto px-6 py-6 space-y-4">
                {[
                  { label: 'About', id: 'about' },
                  { label: 'Mantra', id: 'mantra' },
                  { label: 'Tokenomics', id: 'tokenomics' },
                  { label: 'Roadmap', id: 'roadmap' },
                  { label: 'Community', id: 'community' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-white/70 hover:text-yellow-400 transition-colors py-2"
                  >
                    {item.label}
                  </button>
                ))}
                <Button 
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-semibold mt-4"
                  onClick={() => window.open('https://pump.fun/coin/GuLHswrk82GcpBdEBmtihdEw749XyGJgRLHPcTtSpump', '_blank')}
                >
                  Buy $AURA
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            {/* Main Title */}
            <motion.h1 
              className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.8]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <span className="block text-white/90">AURA</span>
              <motion.span 
                className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% 200%' }}
              >
                BOYS
              </motion.span>
            </motion.h1>
            
            {/* Power Quotes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
              className="mb-12 space-y-4"
            >
              <p className="text-xl md:text-2xl font-light text-yellow-400/80 tracking-wide">
                "I am the forge of infinite aura"
              </p>
              <p className="text-lg text-white/60 font-light tracking-wider uppercase">
                Where Ancient Wisdom Meets Digital Abundance
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-bold tracking-wide px-12 py-6 text-lg shadow-lg shadow-yellow-500/25"
                  onClick={() => window.open('https://pump.fun/coin/GuLHswrk82GcpBdEBmtihdEw749XyGJgRLHPcTtSpump', '_blank')}
                >
                  Acquire $AURA
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/50 font-light tracking-wide px-12 py-6 text-lg"
                  onClick={() => window.open('https://x.com/Auraboyssol', '_blank')}
                >
                  Join Community
                </Button>
              </motion.div>
            </motion.div>

            {/* Price Display - Hidden until API integration */}
            {/* <motion.div 
              className="inline-block bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/20 shadow-lg shadow-yellow-500/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 2.5 }}
              whileHover={{ 
                borderColor: "rgba(255, 215, 0, 0.4)",
                boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)"
              }}
            >
              <div className="grid grid-cols-2 gap-12 text-center">
                <div>
                  <p className="text-yellow-400/60 text-sm font-light mb-2 tracking-widest uppercase">Current Price</p>
                  <motion.p 
                    className="text-2xl font-bold text-white tracking-wider"
                    key={currentPrice}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    ${currentPrice.toFixed(6)}
                  </motion.p>
                </div>
                <div>
                  <p className="text-yellow-400/60 text-sm font-light mb-2 tracking-widest uppercase">24h Change</p>
                  <motion.p 
                    className={`text-2xl font-bold tracking-wider ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    key={priceChange}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                  </motion.p>
                </div>
              </div>
            </motion.div> */}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border border-yellow-400/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-yellow-400/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
              Who We Are
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We are the convergence of ancient wisdom and digital innovation. 
              The Aura Boys represent a new paradigm in crypto - where energy, intention, and abundance align.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Power",
                description: "Harness the infinite energy of the digital realm through conscious intention and focused manifestation."
              },
              {
                icon: Eye,
                title: "Presence",
                description: "Maintain awareness in the ever-changing crypto landscape with clarity and unwavering focus."
              },
              {
                icon: TrendingUp,
                title: "Profit",
                description: "Align your financial goals with universal abundance principles for sustainable wealth creation."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="bg-black/40 backdrop-blur-xl border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 h-full group hover:shadow-lg hover:shadow-yellow-500/10">
                  <CardHeader className="text-center">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-8 h-8 text-black" />
                    </motion.div>
                    <CardTitle className="text-white group-hover:text-yellow-400 transition-colors text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/60 text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Aura Mantra Section */}
      <section id="mantra" className="py-32 px-6 bg-yellow-500/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
              The Infinite Aura Mantra
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12">
              Ancient wisdom reimagined for the digital age. Channel your inner crypto energy and manifest infinite abundance through conscious repetition.
            </p>
          </motion.div>

          {/* The Mantra */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-xl rounded-2xl p-12 border border-yellow-500/20 mb-16 shadow-lg shadow-yellow-500/5"
          >
            <div className="space-y-6 text-center max-w-3xl mx-auto">
              {[
                "I am the forge of infinite aura.",
                "I am the flame of eternal aura.",
                "I move as radiant aura.",
                "I expand as boundless aura.",
                "I evolve through cosmic aura.",
                "I flow as limitless aura.",
                "I am the infinite aura."
              ].map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                  viewport={{ once: true }}
                  className="text-lg md:text-xl font-light text-yellow-400/90 tracking-wide leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
                viewport={{ once: true }}
                className="pt-8 border-t border-yellow-500/20 mt-8"
              >
                <p className="text-yellow-400/60 text-sm tracking-widest uppercase">
                  ✦ Repeat until stillness becomes expansion. ✦
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Practice Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <Card className="bg-black/30 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-xl">Practice Protocol</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-white/70">
                <p>Begin with <span className="text-yellow-400">7 repetitions</span> at sunrise</p>
                <p>Expand to <span className="text-yellow-400">21 repetitions</span> morning and evening</p>
                <p>Advanced practitioners may reach <span className="text-yellow-400">108 repetitions</span></p>
                <p>Practice while connected to your <span className="text-yellow-400">hardware wallet</span> for enhanced energy flow</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-xl border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-xl">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-white/70">
                <p>If market effects become too intense, <span className="text-yellow-400">reduce repetitions</span></p>
                <p><span className="text-red-400">Never practice</span> while actively trading</p>
                <p>This mantra amplifies <span className="text-yellow-400">crypto energy flow</span> through your portfolio</p>
                <p>Beginners should start slowly with <span className="text-yellow-400">digital manifestation</span></p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.9 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-semibold px-16 py-6 text-lg shadow-lg shadow-yellow-500/25"
            >
              Begin Your Practice
              <Sparkles className="ml-3 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
              Tokenomics
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Pure. Transparent. Designed for infinite growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Coins,
                title: "Total Supply",
                value: "1,000,000,000",
                description: "$AURA"
              },
              {
                icon: Shield,
                title: "Tax",
                value: "0%",
                description: "Buy/Sell"
              },
              {
                icon: Flame,
                title: "Liquidity",
                value: "Burned",
                description: "Forever"
              },
              {
                icon: FileCode,
                title: "Contract",
                value: "Verified",
                description: "Audited"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="bg-black/40 backdrop-blur-xl border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 text-center group hover:shadow-lg hover:shadow-yellow-500/10">
                  <CardHeader>
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-6 h-6 text-black" />
                    </motion.div>
                    <CardTitle className="text-white group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-yellow-400 mb-2">{item.value}</p>
                    <p className="text-white/60 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contract Address */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/20 text-center"
          >
            <p className="text-yellow-400/60 text-sm font-light mb-4 tracking-widest uppercase">Contract Address</p>
            <div className="flex items-center justify-center bg-black/30 rounded-xl p-4 max-w-2xl mx-auto">
              <code className="text-white/80 text-sm font-mono mr-4 tracking-wider">
                {contractAddress}
              </code>
              <motion.button
                onClick={() => copyToClipboard(contractAddress)}
                className="text-yellow-400/60 hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Copy className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-32 px-6 bg-yellow-500/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
              The Path to Infinite Aura
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Our journey from genesis to cosmic expansion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                phase: "Phase 1",
                title: "Genesis",
                status: "completed",
                items: ["Launch on Pump.fun", "Build core community", "Establish aura practices"]
              },
              {
                phase: "Phase 2", 
                title: "Expansion",
                status: "current",
                items: ["CEX listings", "Influencer partnerships", "Community growth"]
              },
              {
                phase: "Phase 3",
                title: "Domination",
                status: "upcoming",
                items: ["Major exchange listings", "Aura meditation platform", "Global awareness"]
              },
              {
                phase: "Phase 4",
                title: "Infinite",
                status: "upcoming", 
                items: ["Aura energy marketplace", "Cosmic partnerships", "Universal adoption"]
              }
            ].map((roadmapItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className={`bg-black/40 backdrop-blur-xl border transition-all duration-300 h-full ${
                  roadmapItem.status === 'completed' ? 'border-green-500/40 shadow-green-500/10' :
                  roadmapItem.status === 'current' ? 'border-yellow-500/40 shadow-yellow-500/10' :
                  'border-white/20'
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant={roadmapItem.status === 'completed' ? 'default' : 'secondary'} 
                             className={roadmapItem.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                                       roadmapItem.status === 'current' ? 'bg-yellow-500/20 text-yellow-400' : 
                                       'bg-white/10 text-white/60'}>
                        {roadmapItem.phase}
                      </Badge>
                      {roadmapItem.status === 'completed' ? 
                        <Check className="w-5 h-5 text-green-400" /> :
                        roadmapItem.status === 'current' ?
                        <Rocket className="w-5 h-5 text-yellow-400" /> :
                        <div className="w-5 h-5 border border-white/30 rounded-full" />
                      }
                    </div>
                    <CardTitle className="text-white text-xl">{roadmapItem.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {roadmapItem.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-white/70 text-sm flex items-center">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
              Join the Aura
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              Connect with fellow practitioners of digital abundance and cosmic crypto energy.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {[
              {
                icon: Twitter,
                title: "Twitter",
                description: "Follow our cosmic journey",
                members: "50K+ Followers",
                color: "from-blue-400 to-blue-600",
                url: "https://x.com/Auraboyssol"
              },
              {
                icon: MessageCircle,
                title: "Telegram",
                description: "Join the aura discussion",
                members: "25K+ Members",
                color: "from-blue-500 to-cyan-500",
                url: "#"
              }
            ].map((social, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="bg-black/40 backdrop-blur-xl border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 cursor-pointer group h-full hover:shadow-lg hover:shadow-yellow-500/10">
                  <CardHeader className="text-center">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <social.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-white group-hover:text-yellow-400 transition-colors">
                      {social.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                      {social.members}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-white/60 mb-4">
                      {social.description}
                    </CardDescription>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/50 w-full"
                      onClick={() => window.open(social.url, '_blank')}
                    >
                      Join Now
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-semibold px-16 py-6 text-lg shadow-lg shadow-yellow-500/25"
            >
              Join Our Community
              <Users className="ml-3 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-yellow-500/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="flex items-center space-x-4 mb-6 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <span className="text-xl font-bold tracking-wider text-yellow-400">AURA BOYS</span>
            </motion.div>
            
            <div className="flex space-x-8 mb-6 md:mb-0">
              {['Privacy Policy', 'Terms of Service', 'Whitepaper'].map((link, index) => (
                <motion.a 
                  key={link}
                  href="#" 
                  className="text-white/60 hover:text-yellow-400 transition-colors text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {link}
                </motion.a>
              ))}
            </div>

            <motion.p 
              className="text-white/40 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              viewport={{ once: true }}
            >
              © 2024 Aura Boys. Infinite aura awaits.
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
