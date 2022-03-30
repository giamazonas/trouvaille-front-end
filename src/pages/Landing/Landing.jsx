import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      { user ? 
      <div><br /> <br/>
      <h1>Trouvaille</h1><br />
      <h2>/tro͞o`vī/</h2><br /><br />
      <h3>a chance encounter with something wonderful</h3>
      </div>
    :
    <div>
    <h1>Trouvaille</h1>
    <h1>/tro͞o`vī/</h1>
    <h3>Please sign in to encounter the best day of your life</h3>
    </div>
    }
    </main>
  )
}

export default Landing