import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Choice, GameResult, GameSettings, GameState } from './types';
import { getRandomChoice, determineWinner } from './utils/gameLogic';
import { ChoiceButton } from './components/ChoiceButton';
import { Result } from './components/Result';
import { GameArena } from './components/GameArena';
import { WelcomeModal } from './components/WelcomeModal';
import { GameOverModal } from './components/GameOverModal';
import { GameInfo } from './components/GameInfo';

function App() {
  const [settings, setSettings] = useState<GameSettings | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 1,
    isGameOver: false,
    playerScore: 0,
    computerScore: 0,
  });
  
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<GameResult>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleStart = (newSettings: GameSettings) => {
    setSettings(newSettings);
    setShowWelcome(false);
    resetGame(false);
  };

  const resetGame = (showModal = true) => {
    setGameState({
      currentRound: 1,
      isGameOver: false,
      playerScore: 0,
      computerScore: 0,
    });
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setIsPlaying(false);
    if (showModal) {
      setShowWelcome(true);
    }
  };

  const handleChoice = async (choice: Choice) => {
    if (isPlaying || !settings || gameState.isGameOver) return;
    
    setIsPlaying(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);

    // Wait for hand animation
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const computerSelection = getRandomChoice();
    setComputerChoice(computerSelection);
    
    // Wait for reveal animation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const gameResult = determineWinner(choice, computerSelection);
    setResult(gameResult);
    
    setGameState(prev => {
      const newState = {
        ...prev,
        currentRound: prev.currentRound + 1,
        playerScore: gameResult === 'win' ? prev.playerScore + 1 : prev.playerScore,
        computerScore: gameResult === 'lose' ? prev.computerScore + 1 : prev.computerScore,
      };
      
      // Check if game is over
      if (prev.currentRound >= (settings?.rounds || 5)) {
        newState.isGameOver = true;
      }
      
      return newState;
    });
    
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white text-center mb-8"
        >
          Rock Paper Scissors
        </motion.h1>

        <AnimatePresence>
          {showWelcome && (
            <WelcomeModal 
              onStart={handleStart} 
              initialPlayerName={settings?.playerName || ''} 
            />
          )}
        </AnimatePresence>

        {!showWelcome && (
          <>
            <GameInfo 
              gameState={gameState} 
              playerName={settings?.playerName || ''} 
            />

            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl"
              animate={{
                boxShadow: isPlaying 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
              }}
            >
              <GameArena
                playerChoice={playerChoice}
                computerChoice={computerChoice}
                isPlaying={isPlaying}
              />

              <Result result={result} />

              <div className="grid grid-cols-3 gap-4">
                {(['rock', 'paper', 'scissors'] as Choice[]).map((choice) => (
                  <ChoiceButton
                    key={choice}
                    choice={choice}
                    onClick={() => handleChoice(choice)}
                    disabled={isPlaying || gameState.isGameOver}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>

      <AnimatePresence>
        {gameState.isGameOver && (
          <GameOverModal
            gameState={gameState}
            playerName={settings?.playerName || ''}
            onRestart={resetGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;