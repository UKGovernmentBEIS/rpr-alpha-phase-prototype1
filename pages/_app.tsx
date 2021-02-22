import '../styles/global.scss'
import GdsHeader from '../src/components/gds-header/gds-header'
import GdsFooter from '../src/components/gds-footer/gds-footer'
import GdsAlphaBanner from '../src/components/gds-alpha-banner/gds-alpha-banner'
import React from 'react'

export default function App({ Component, pageProps }) {
    return (
        <>
            <GdsHeader serviceName="Regulated Professions" />
            <GdsAlphaBanner />
            <Component {...pageProps} />
            <GdsFooter />
        </>
    )
}