import React from 'react'
import '../style.scss'
import LoginPage from './LoginPage'
import ClonedComponent from './ClonedComponent'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <ClonedComponent {...pageProps} />
}