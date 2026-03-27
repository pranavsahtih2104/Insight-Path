import { Info } from 'lucide-react'
import { motion } from 'framer-motion'

export default function InsightPanel({ insight }) {
  if (!insight) return null

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.4, delay: 0.1 }}
      className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mt-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
    >
      <div className="flex items-start space-x-3">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-primary mb-1 shadow-[0_0_10px_rgba(99,102,241,0.3)]">AI Insight</h4>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {insight}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
