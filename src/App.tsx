import React, { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, ShieldX, Search, Loader2, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeEmail, AnalysisResult } from './services/Analyzer';

export default function App() {
  const [emailText, setEmailText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!emailText.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeEmail(emailText);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Safe': return 'text-cyber-green';
      case 'Suspicious': return 'text-cyber-yellow';
      case 'Phishing': return 'text-cyber-red';
      default: return 'text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Safe': return <ShieldCheck className="w-8 h-8 text-cyber-green" />;
      case 'Suspicious': return <ShieldAlert className="w-8 h-8 text-cyber-yellow" />;
      case 'Phishing': return <ShieldX className="w-8 h-8 text-cyber-red" />;
      default: return <Shield className="w-8 h-8 text-slate-400" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Safe': return 'bg-cyber-green/10';
      case 'Suspicious': return 'bg-cyber-yellow/10';
      case 'Phishing': return 'bg-cyber-red/10';
      default: return 'bg-white/5';
    }
  };

  const getConfidenceBarColor = (status: string) => {
    switch (status) {
      case 'Safe': return 'bg-cyber-green';
      case 'Suspicious': return 'bg-cyber-yellow';
      case 'Phishing': return 'bg-cyber-red';
      default: return 'bg-cyber-blue';
    }
  };

  const getGlowClass = (status: string) => {
    switch (status) {
      case 'Safe': return 'cyber-glow-green border-cyber-green/30';
      case 'Suspicious': return 'border-cyber-yellow/30 shadow-[0_0_15px_rgba(255,204,0,0.2)]';
      case 'Phishing': return 'cyber-glow-red border-cyber-red/30';
      default: return 'border-white/10';
    }
  };

  return (
    <div className="w-[400px] min-h-[600px] bg-cyber-bg p-6 flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-cyber-blue" />
          <h1 className="text-xl font-bold tracking-tight cyber-gradient-text">
            AI Phishing Detector
          </h1>
        </div>
        <p className="text-xs text-slate-400 font-medium">
          Analyze suspicious emails instantly
        </p>
      </header>

      {/* Input Section */}
      <div className="flex flex-col gap-3">
        <div className="relative group">
          <textarea
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Paste email content here..."
            className="w-full h-40 bg-cyber-card cyber-border rounded-xl p-4 text-sm resize-none focus:outline-hidden focus:ring-1 focus:ring-cyber-blue/50 transition-all placeholder:text-slate-600"
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-slate-500 font-mono">
            {emailText.length} chars
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !emailText.trim()}
          className="w-full py-3 bg-cyber-blue text-cyber-bg font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cyber-glow-blue"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analyze Email
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-cyber-red/10 border border-cyber-red/30 rounded-xl flex items-center gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-cyber-red shrink-0" />
            <p className="text-xs text-cyber-red font-medium">{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`p-5 border rounded-2xl flex flex-col gap-4 transition-all ${getStatusBg(result.status)} ${getGlowClass(result.status)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(result.status)}
                <div>
                  <h2 className={`text-lg font-bold ${getStatusColor(result.status)}`}>
                    {result.status === 'Phishing' ? '🚨 Phishing Detected' : 
                     result.status === 'Suspicious' ? '⚠️ Suspicious Email' : 
                     '✅ Email Safe'}
                  </h2>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Risk Assessment
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-mono font-bold text-white">
                  {result.confidence}%
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">
                  Confidence
                </p>
              </div>
            </div>

            {/* Confidence Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full ${getConfidenceBarColor(result.status)}`}
              />
            </div>

            <div className="h-px bg-white/5" />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-cyber-blue">
                <Info className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">Reason</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {result.explanation}
              </p>
            </div>

            {result.suspiciousWords.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-cyber-red">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Suspicious Words</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.suspiciousWords.map((word, i) => (
                    <span 
                      key={i} 
                      className="flex items-center gap-1 px-2 py-1 bg-cyber-red/20 border border-cyber-red/30 rounded text-[10px] text-cyber-red font-mono font-bold"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-600 font-mono">
        <span>V1.0.0</span>
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          SECURE SCAN ACTIVE
        </span>
      </footer>
    </div>
  );
}
