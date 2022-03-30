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
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h1 className="text-xl font-medium leading-6 text-gray-900">Create an Account</h1>
            <br></br>
            <p className="mt-1 text-md text-gray-600">Welcome to Trouvaille!</p>
            <p className="mt-1 text-md text-gray-600">You're just a step away from encountering your best day of your life!</p>
            <p className="mt-1 text-sm text-gray-600">{message}</p>
            <br></br>
            <Link to="/" className="underline underline-offset-2 hover:font-bold">Go back to main</Link>
          </div>
        </div>
        <SignupForm {...props} updateMessage={updateMessage} />
      </div>

    </>
  )
}

export default Signup
