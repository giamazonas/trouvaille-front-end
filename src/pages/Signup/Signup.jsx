import { useState } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'

const Signup = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <>
      <p className="mt-1 text-sm text-gray-600">{message}</p>
      <SignupForm {...props} updateMessage={updateMessage} />
    </>
  )
}

export default Signup
