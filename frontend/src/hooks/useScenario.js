import { useState } from 'react';
import { api } from '../services/api';

export function useScenario() {
  const [scenarioId, setScenarioId] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const start = async (prompt) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.startScenario(prompt);
      setScenarioId(data.scenarioId);
      setCurrentStep(data);
      setHistory([{ role: 'user', content: prompt }]);
    } catch (err) {
      setError('Failed to start scenario. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const makeChoice = async (option) => {
    if (!scenarioId) return;
    
    setLoading(true);
    setError(null);
    
    // Add user choice to history
    setHistory(prev => [...prev, 
      { role: 'assistant', content: currentStep.insight },
      { role: 'user', content: option }
    ]);

    try {
      const data = await api.nextStep(scenarioId, option);
      setCurrentStep(data);
      
      // If no options, we've reached the end
      if (!data.options || data.options.length === 0) {
        await finish();
      }
    } catch (err) {
      setError('Failed to fetch next step.');
    } finally {
      setLoading(false);
    }
  };

  const finish = async () => {
    try {
      const data = await api.getResult(scenarioId);
      setResult(data);
    } catch (err) {
      setError('Failed to load final result.');
    }
  };

  return {
    scenarioId,
    currentStep,
    history,
    loading,
    error,
    result,
    start,
    makeChoice
  };
}
