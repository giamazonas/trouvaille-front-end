import { useState } from 'react'
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm'

const ChangePassword = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <>
      <p>{message}</p>
      <ChangePasswordForm {...props} updateMessage={updateMessage} />
    </>
  )
}

export default ChangePassword
