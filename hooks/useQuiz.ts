'use client'

import { useState, useCallback } from 'react'
import { QuizQuestion, AnswerState } from '@/lib/types'

interface QuizState {
  currentIndex: number
  score: number
  selectedIndex: number | null
  answerState: AnswerState
  isComplete: boolean
}

export function useQuiz(questions: QuizQuestion[]) {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    score: 0,
    selectedIndex: null,
    answerState: 'unanswered',
    isComplete: false,
  })

  const currentQuestion = questions[state.currentIndex]
  const isLastQuestion = state.currentIndex === questions.length - 1

  const selectAnswer = useCallback((index: number) => {
    setState(prev => {
      if (prev.answerState !== 'unanswered') return prev
      const isCorrect = index === questions[prev.currentIndex].correctIndex
      return {
        ...prev,
        selectedIndex: index,
        answerState: isCorrect ? 'correct' : 'incorrect',
        score: isCorrect ? prev.score + 1 : prev.score,
      }
    })
  }, [questions])

  const nextQuestion = useCallback(() => {
    setState(prev => {
      if (prev.currentIndex >= questions.length - 1) {
        return { ...prev, isComplete: true }
      }
      return {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedIndex: null,
        answerState: 'unanswered',
      }
    })
  }, [questions.length])

  const restart = useCallback(() => {
    setState({
      currentIndex: 0,
      score: 0,
      selectedIndex: null,
      answerState: 'unanswered',
      isComplete: false,
    })
  }, [])

  return {
    currentQuestion,
    currentIndex: state.currentIndex,
    totalQuestions: questions.length,
    score: state.score,
    selectedIndex: state.selectedIndex,
    answerState: state.answerState,
    isComplete: state.isComplete,
    isLastQuestion,
    selectAnswer,
    nextQuestion,
    restart,
  }
}
