import { motion } from 'framer-motion'

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.4 }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-4 ${
          isUser
            ? 'bg-primary text-white rounded-br-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]'
            : 'bg-white/5 text-foreground border border-white/5 rounded-bl-sm backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
        }`}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
    </motion.div>
  )
}
