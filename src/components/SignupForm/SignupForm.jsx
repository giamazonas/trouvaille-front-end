import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

const SignupForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
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
      await authService.signup(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
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
            <p className="mt-1 text-md text-gray-600">You're just a step away from encountering your best day of your life!</p>
            <br></br>
            <Link to="/" className="underline underline-offset-2 hover:font-bold">Go back to main</Link>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      autoComplete="off"
                      id="name"
                      value={name}
                      name="name"
                      onChange={handleChange}
                      required
                      className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="required"
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      autoComplete="off"
                      id="email"
                      value={email}
                      name="email"
                      onChange={handleChange}
                      required
                      placeholder="required"
                      className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      autoComplete="off"
                      id="password"
                      value={password}
                      name="password"
                      onChange={handleChange}
                      required
                      placeholder="required"
                      className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      id="confirm"
                      value={passwordConf}
                      name="passwordConf"
                      onChange={handleChange}
                      required
                      placeholder="required"
                      className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6">
                    <button disabled={isFormInvalid()} className="block w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 disabled:bg-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignupForm
