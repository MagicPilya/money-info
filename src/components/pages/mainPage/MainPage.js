import React from 'react'
import { getToken } from '../../../firebase/auth'

export default function MainPage() {
  return (
    <div>MainPage
      <button
        onClick={()=> getToken()}
      >
        CheckTokenId
      </button>
    </div>
  )
}
