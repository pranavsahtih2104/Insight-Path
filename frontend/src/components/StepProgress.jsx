export default function StepProgress({ currentStep, totalSteps = 7 }) {
  // Use a softer logarithmic scale for progress to illustrate indefinite length
  // e.g., Step 1: 50%, Step 2: 75%, Step 3: 87.5% etc. Alternatively just use a pulsing indeterminate bar.
  // We will simply progress it up to a high number or create an indeterminate load.
  // For aesthetic simplicity: Progress bounds asymptotically to 100%
  const progress = 100 - (100 / Math.pow(1.5, currentStep));

  return (
    <div className="w-full py-4 space-y-3">
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-md px-4 py-2 rounded-lg border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          Decision Progress
        </span>
        <span className="text-xs font-medium text-foreground">
          Step {currentStep}
        </span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] border border-white/5">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
