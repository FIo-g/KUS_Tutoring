'use client'

import { useState, useCallback } from 'react'
import { QuizQuestion, AnswerState, WrongAnswer } from '@/lib/types'

interface QuizState {
  currentIndex: number
  score: number
  selectedIndex: number | null
  answerState: AnswerState
  isComplete: boolean
  wrongAnswers: WrongAnswer[]
}

export function useQuiz(questions: QuizQuestion[]) {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    score: 0,
    selectedIndex: null,
    answerState: 'unanswered',
    isComplete: false,
    wrongAnswers: [],
  })

  const currentQuestion = questions[state.currentIndex]
  const isLastQuestion = state.currentIndex === questions.length - 1

  const selectAnswer = useCallback((index: number) => {
    setState(prev => {
      if (prev.answerState !== 'unanswered') return prev

      const question = questions[prev.currentIndex]
      const isCorrect = index === question.correctIndex

      const newWrongAnswers = isCorrect
        ? prev.wrongAnswers
        : [
            ...prev.wrongAnswers,
            {
              questionNumber: prev.currentIndex + 1,
              question,
              selectedIndex: index,
            } satisfies WrongAnswer,
          ]

      return {
        ...prev,
        selectedIndex: index,
        answerState: isCorrect ? 'correct' : 'incorrect',
        score: isCorrect ? prev.score + 1 : prev.score,
        wrongAnswers: newWrongAnswers,
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
      wrongAnswers: [],
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
    wrongAnswers: state.wrongAnswers,
    isLastQuestion,
    selectAnswer,
    nextQuestion,
    restart,
  }
}
