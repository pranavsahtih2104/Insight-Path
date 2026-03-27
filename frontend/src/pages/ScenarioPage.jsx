import { useEffect, useRef } from 'react'
import ChatMessage from '../components/ChatMessage'
import OptionCard from '../components/OptionCard'
import InsightPanel from '../components/InsightPanel'
import StepProgress from '../components/StepProgress'

export default function ScenarioPage({ scenario }) {
  const { currentStep, history, loading, error, makeChoice } = scenario
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, currentStep])

  if (!currentStep) return null

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-white/10 z-10 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold tracking-tight text-foreground">InsightPath Exploration</h2>
          <StepProgress currentStep={currentStep.stepNumber} totalSteps={7} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col space-y-6">
          {history.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}

          {loading && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="bg-white/5 border border-white/5 px-5 py-4 rounded-2xl rounded-bl-sm flex space-x-2 items-center backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}

          {!loading && currentStep.options && currentStep.options.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 animate-fade-in-up">
              {currentStep.options.map((option, i) => (
                <OptionCard
                  key={i}
                  option={option}
                  onClick={makeChoice}
                  disabled={loading}
                />
              ))}
            </div>
          )}

          {!loading && currentStep.insight && history.length === 1 && (
            <InsightPanel insight={currentStep.insight} />
          )}

          {error && <p className="text-destructive text-center mt-4 font-medium">{error}</p>}

          <div ref={bottomRef} className="h-4" />
        </div>
      </div>
    </div>
  )
}
