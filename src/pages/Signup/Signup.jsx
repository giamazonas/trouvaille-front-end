import { useState } from 'react'
import { Link } from 'react-router-dom'
import SignupForm from '../../components/SignupForm/SignupForm'
import styles from './Signup.module.css'

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
