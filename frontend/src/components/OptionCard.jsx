import { motion } from 'framer-motion'

export default function OptionCard({ option, onClick, disabled }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(option)}
      disabled={disabled}
      className="w-full text-left p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-primary/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:bg-white/10 transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-center justify-between z-10">
        <span className="text-sm font-medium text-foreground group-hover:text-white transition-colors pr-4 leading-relaxed">
          {option}
        </span>
        <div className="flex-shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/20 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
        </div>
      </div>
    </motion.button>
  )
}
