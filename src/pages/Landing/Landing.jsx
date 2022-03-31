import styles from './Landing.module.css'
import MapBoxTwo from '../../components/MapBox/MapBoxTwo'

const Landing = ({ user }) => {
  return (
    <div>
      <MapBoxTwo />
    </div>
    // <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="relative pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
    //       <div className="mt-6 mx-auto max-w-7xl px-4 sm:mt-8 sm:px-6 md:mt-10 lg:mt-12 lg:px-8 xl:mt-28">
    //         <div className="sm:text-center lg:text-center">
    //           <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
    //             <p className="block">trouvaille.</p>
    //             <p className="block text-2xl tracking-tight text-gray-400 sm:text-3xl md:text-4xl">/tro͞o'vī/</p>
    //           </h1>
    //           <p className="mt-3 italic text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
    //             a chance encounter with something wonderful
    //           </p>
    //         </div>
    //         {!user ?
    //           <>
    //             <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
    //               <div className="rounded-md shadow">
    //                 <a
    //                   href="/login"
    //                   className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 md:py-2 md:text-lg md:px-10"
    //                 >
    //                   Sign in
    //                 </a>
    //               </div>
    //               <div className="mt-3 sm:mt-0 sm:ml-3">
    //                 <a
    //                   href="/signup"
    //                   className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 md:py-2 md:text-lg md:px-10"
    //                 >
    //                   Sign up
    //                 </a>
    //               </div>
    //             </div>
    //           </>
    //           :
    //           <>
    //           </>
    //         }
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Landing