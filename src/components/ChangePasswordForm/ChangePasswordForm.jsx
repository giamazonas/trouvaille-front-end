import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

const ChangePasswordForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    pw: '',
    newPw: '',
    newPwConf: '',
  })

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.changePassword(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { pw, newPw, newPwConf } = formData

  const isFormInvalid = () => {
    return !(pw && newPw && newPw === newPwConf)
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          /> */}
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Change Password</h2>
          </div>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">Current Password</label>
                <input
                  type="password"
                  autoComplete="off"
                  id="password"
                  value={pw}
                  name="pw"
                  onChange={handleChange}
                  required
                  className="mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Current Password"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="sr-only">
                  New Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  id="newPassword"
                  value={newPw}
                  name="newPw"
                  onChange={handleChange}
                  required
                  className="mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                />
              </div>
              <div>
                <label htmlFor="newPasswordConf" className="sr-only">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  id="newPasswordConf"
                  value={newPwConf}
                  name="newPwConf"
                  onChange={handleChange}
                  required
                  className="mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
              <div>
                <button disabled={isFormInvalid()} className="mt-5 block w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 disabled:bg-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Change Password
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="mt-5 flex items-center mx-auto">
                <Link to="/" className="underline underline-offset-2 hover:font-bold">cancel</Link>
              </div>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default ChangePasswordForm
