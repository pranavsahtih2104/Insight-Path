import { ArrowLeft, CheckCircle } from 'lucide-react'
import DecisionFlowChart from '../components/DecisionFlowChart'
import OutcomeCharts from '../components/OutcomeCharts'

export default function ResultPage({ result, history }) {
  const { decisionPath, analysis, summary } = result
  

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-primary/30">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Exploration Complete</h1>
            <p className="text-muted-foreground font-medium">{summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <h3 className="text-lg font-bold mb-4 tracking-tight">Your Decision Journey</h3>
              <DecisionFlowChart steps={decisionPath} />
            </div>

            <div className="bg-primary/10 backdrop-blur-xl rounded-2xl p-6 border border-primary/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <h3 className="text-lg font-bold text-primary mb-3">Final AI Insight</h3>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {analysis || "The AI concluded the exploration here."}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <OutcomeCharts />
            
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Path Summary</h3>
              <ul className="space-y-3">
                {decisionPath.filter(s => s.chosenOption).map((step, i) => (
                  <li key={i} className="text-sm border-l-2 border-primary pl-3 py-1">
                    <span className="font-semibold block text-foreground">Step {step.stepNumber}</span>
                    <span className="text-muted-foreground">{step.chosenOption}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => window.location.reload()} 
              className="w-full py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl font-medium text-foreground hover:bg-white/10 hover:border-primary/50 transition-all flex items-center justify-center space-x-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore New Scenario</span>
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}
