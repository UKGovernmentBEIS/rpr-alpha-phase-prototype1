import Head from 'next/head'
import ContentTemplate from '../src/components/templates/content/content-template'
import GdsHeading2 from '../src/components/gds-heading2/gds-heading2'
import GdsHeading3 from '../src/components/gds-heading3/gds-heading3'
import GdsList from '../src/components/gds-list/gds-list'
import GdsBulletList from '../src/components/gds-bullet-list/gds-bullet-list'
import GdsStartButton from '../src/components/gds-start-button/gds-start-button'
import GdsParagraph from '../src/components/gds-paragraph/gds-paragraph'
import GdsInsetText from '../src/components/gds-inset-text/gds-inset-text'
import GdsLink from '../src/components/gds-link/gds-link'
import useGdsScripts from '../src/components/use-gds-scripts/use-gds-scripts'

const siteTitle = 'Regulated Professions'

const Index = function() {
    const pageTitle = 'Check a regulated profession in the UK'
    const relatedContent = [
        {
            href: '/',
            label: 'Related link'
        },
        {
            href: '/',
            label: 'Related link'
        },
        {
            href: '/',
            label: 'More'
        }
    ]

    return (
        <ContentTemplate relatedContent={relatedContent} pageTitle={pageTitle}>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <GdsParagraph>
                Some professions in the UK are regulated. If you want to work in a regulated profession, you need to contact the regulatory authority who will recognise your qualification and register you.
            </GdsParagraph>

            <GdsBulletList id="service-introduction" description="Use this service to:">
                <span>Check if your profession is regulated and what qualifications are required</span>
                <span>Find regulatory authority contact details for your profession</span>
                <span>View annual figures regarding applications to work in regulated professions in the UK</span>
            </GdsBulletList>

            <GdsInsetText>
                <GdsLink href="/">This service is also available in Welsh.</GdsLink>
            </GdsInsetText>

            <GdsStartButton href="/select">Start now</GdsStartButton>

            <GdsHeading2>Other ways to find information</GdsHeading2>

            <GdsParagraph>
                If you need support checking a regulated profession you can contact the National Recognition Information Centre for the United Kingdom (UK NARIC)
            </GdsParagraph>

            <GdsHeading3>By phone</GdsHeading3>
   
            <GdsInsetText>
                <GdsHeading3>UK NARIC</GdsHeading3>
                <GdsList id="phone-contact">
                    <span>Monday to Friday  UK time: 09.00 - 17.00</span>
                    <span>Phone UK: 0871 330 7033</span>
                    <span>Phone from overseas: 00 44 3003 038777 </span>
                    <GdsLink href="/">Find out about call charges</GdsLink>
                </GdsList>
            </GdsInsetText>

            <GdsHeading3>By email</GdsHeading3>

            <GdsInsetText>
                <GdsHeading3>UK NARIC</GdsHeading3>
                <GdsList id="email-contact">
                    <span>?????@naric.org.uk</span>
                    <span>Monday to Friday 09.00 - 17.00 (UK time)</span>
                </GdsList>
            </GdsInsetText>
        </ContentTemplate>
    )
}

export default useGdsScripts(Index)