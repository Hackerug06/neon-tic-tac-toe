"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [xWins, setXWins] = useState(0)
  const [oWins, setOWins] = useState(0)

  const winner = calculateWinner(board)
  const status = winner ? `Winner: ${winner}` : board.every(Boolean) ? "Draw!" : `Next player: ${xIsNext ? "X" : "O"}`

  useEffect(() => {
    if (winner) {
      if (winner === "X") {
        setXWins((prev) => prev + 1)
      } else {
        setOWins((prev) => prev + 1)
      }
    }
  }, [winner])

  function handleClick(index: number) {
    if (board[index] || calculateWinner(board)) {
      return
    }
    const newBoard = board.slice()
    newBoard[index] = xIsNext ? "X" : "O"
    setBoard(newBoard)
    setXIsNext(!xIsNext)
  }

  function calculateWinner(squares: (string | null)[]) {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  function restartGame() {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative p-8 rounded-lg shadow-lg bg-black">
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(90deg, #00f, #0ff, #00f)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {board.map((value, index) => (
              <motion.button
                key={index}
                className="w-24 h-24 flex items-center justify-center text-4xl font-bold bg-black text-white border-2 border-blue-500 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClick(index)}
              >
                {value}
              </motion.button>
            ))}
          </div>
          <motion.div
            className="mb-4 text-center text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {status}
          </motion.div>
          <div className="flex justify-between mb-4">
            <div className="text-white">X Wins: {xWins}</div>
            <div className="text-white">O Wins: {oWins}</div>
          </div>
          <motion.button
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={restartGame}
          >
            Restart Game
          </motion.button>
        </div>
      </div>
    </div>
  )
}

  
