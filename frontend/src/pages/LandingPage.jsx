import { BrainCircuit } from 'lucide-react'
import ScenarioInput from '../components/ScenarioInput'

export default function LandingPage({ onStart, loading, error }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground">
      <div className="w-full max-w-3xl flex flex-col items-center text-center space-y-8 animate-fade-in-up">
        
        <div className="w-16 h-16 flex items-center justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
            <div className="relative w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <BrainCircuit className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            InsightPath
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Understand the path behind your decisions.
          </p>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Describe a scenario, and let AI guide you through the consequences of your choices step by step.
          </p>
        </div>

        <div className="w-full pt-8">
          <ScenarioInput onStart={onStart} loading={loading} error={error} />
        </div>

        <div className="pt-12 text-sm text-muted-foreground/80 w-full max-w-md mx-auto">
          <p className="font-medium mb-3">Example scenarios to explore:</p>
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => onStart("I got a software job offer but I'm also thinking about MS abroad.")}
              disabled={loading}
              className="text-left px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-primary/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 text-foreground"
            >
              "I got a software job offer but I'm also thinking about MS abroad."
            </button>
            <button 
              onClick={() => onStart("Should I bootstrap my startup or raise venture capital?")}
              disabled={loading}
              className="text-left px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-primary/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 text-foreground"
            >
              "Should I bootstrap my startup or raise venture capital?"
            </button>
          </div>
        </div>
        
      </div>
    </div>
  )
}
