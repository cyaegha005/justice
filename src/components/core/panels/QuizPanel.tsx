"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Clock, Trophy } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What is the core innovation of Transformer architecture?",
    options: ["Convolutional Neural Networks", "Self-Attention Mechanism", "Recurrent Neural Networks", "Reinforcement Learning"],
    correct: 1,
  },
  {
    id: 2,
    question: "What does GPT stand for?",
    options: ["General Processing Technology", "Generative Pre-trained Transformer", "Graphics Processing Unit", "Global Parameter Tuning"],
    correct: 1,
  },
];

export function QuizPanel() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      setShowResult(true);
    }, 500);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <Clock className="w-4 h-4 text-white/50" />
          <span className="text-white/70 text-sm">10:00</span>
        </div>
        <div 
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' }}
        >
          <Trophy className="w-4 h-4 text-indigo-400" />
          <span className="text-white text-sm">{score}/{questions.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            background: 'linear-gradient(90deg, #6366f1, #ec4899)'
          }}
        />
      </div>

      {/* Question */}
      <div 
        className="p-5 rounded-xl"
        style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
      >
        <p className="text-white font-medium mb-4">
          {currentQuestion + 1}. {question.question}
        </p>
        
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const showCorrect = showResult && index === question.correct;
            const showWrong = showResult && isSelected && index !== question.correct;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className="w-full p-3 rounded-lg text-left transition-all flex items-center justify-between"
                style={{
                  background: showCorrect 
                    ? 'rgba(16, 185, 129, 0.2)'
                    : showWrong
                    ? 'rgba(239, 68, 68, 0.2)'
                    : isSelected
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${
                    showCorrect ? 'rgba(16, 185, 129, 0.5)' :
                    showWrong ? 'rgba(239, 68, 68, 0.5)' :
                    isSelected ? 'rgba(99, 102, 241, 0.5)' :
                    'rgba(255, 255, 255, 0.1)'
                  }`
                }}
              >
                <span className="text-white text-sm">{option}</span>
                {showCorrect && <CheckCircle className="w-4 h-4 text-green-400" />}
                {showWrong && <XCircle className="w-4 h-4 text-red-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result */}
      {showResult && (
        <div 
          className="p-4 rounded-xl animate-message-in"
          style={{
            background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span className={`font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          <p className="text-white/60 text-sm">
            {isCorrect 
              ? 'Great job! You have mastered this knowledge point.' 
              : `Correct answer: ${question.options[question.correct]}`}
          </p>
        </div>
      )}

      {/* Next Button */}
      {showResult && currentQuestion < questions.length - 1 && (
        <button
          onClick={nextQuestion}
          className="w-full py-3 px-4 rounded-xl text-white font-medium transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' }}
        >
          Next Question
        </button>
      )}
    </div>
  );
}
