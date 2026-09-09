import { useEffect, useState } from 'react'
import { getIntroRevealed, subscribeIntroReveal } from '../utils/introSequence'

export function useIntroRevealed() {
  const [isRevealed, setIsRevealed] = useState(getIntroRevealed)

  useEffect(() => {
    if (isRevealed) return
    return subscribeIntroReveal(setIsRevealed)
  }, [isRevealed])

  return isRevealed
}
