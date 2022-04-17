import '../styles/globals.css'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const MyApp = ({ Component, pageProps }) => (
  <>
    <Toaster position="top-center" />
    <Component {...pageProps} />
  </>
)

export default MyApp
