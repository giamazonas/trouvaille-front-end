import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
        </div>
      </div>
      {!user ?
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                    <p className="block xl:inline">trouvaille.</p><br></br>
                    <p className="block text-gray-500 xl:inline">/tro͞o'vī/</p>
                  </h1>
                  <p className="mt-3 italic text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    a chance encounter with something wonderful
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <a
                        href="/login"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 md:py-4 md:text-lg md:px-10"
                      >
                        Sign in
                      </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a
                        href="/signup"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
                      >
                        Sign up
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 border">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>

        :
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">

              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                  <p className="block xl:inline">trouvaille.</p><br></br>
                  <p className="block text-gray-500 xl:inline">/tro͞o'vī/</p>
                </h1>
                <p className="mt-3 italic text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  a chance encounter with something wonderful
                </p>
              </div>
            </div>
          </div>
        </div>

      }
    </>
  )
}

export default Landing