import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ScenarioInput({ onStart, loading, error }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      onStart(prompt.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative group">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. I got a 10 LPA software job offer but I'm also thinking about doing MS abroad..."
          className="w-full p-4 pr-16 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] focus:ring-1 focus:ring-primary/50 focus:border-primary/50 focus:outline-none resize-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
          rows={3}
          disabled={loading}
        />
        <div className="absolute bottom-4 right-4 group-focus-within:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-primary/40 rounded-lg blur-md group-focus-within:animate-pulse"></div>
          <button
            type="submit"
            disabled={!prompt.trim() || loading}
            className="relative p-2 bg-primary text-white rounded-lg hover:bg-indigo-400 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-white/10"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/80 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
      {error && <p className="text-destructive text-sm font-medium">{error}</p>}
    </div>
  );
}
