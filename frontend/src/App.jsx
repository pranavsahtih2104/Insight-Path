import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import ScenarioPage from './pages/ScenarioPage'
import ResultPage from './pages/ResultPage'
import { useScenario } from './hooks/useScenario'

import { AnimatePresence, motion } from 'framer-motion'

function App() {
  const scenario = useScenario()
  
  return (
    <AnimatePresence mode="wait">
      {scenario.result ? (
        <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
          <ResultPage result={scenario.result} history={scenario.history} />
        </motion.div>
      ) : scenario.scenarioId ? (
        <motion.div key="scenario" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
          <ScenarioPage scenario={scenario} />
        </motion.div>
      ) : (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
          <LandingPage onStart={scenario.start} loading={scenario.loading} error={scenario.error} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
