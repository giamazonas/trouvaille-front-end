import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      { user ? 
      <div>
      <h1>Trouvaille</h1>
      <h1>/tro͞o`vī/</h1>
      <h3>a chance encounter with something wonderful</h3>
      </div>
    :
    <div>
    <h1>Trouvaille</h1>
    <h1>/tro͞o`vī/</h1>
    <h3>Please sign in to encounter the best day of your life</h3>
    <a href="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign in
              </a>
              <a
                href="/signup"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-gray-400"
              >
                Sign up
              </a>
    </div>
    }
    </main>
  )
}

export default Landing