import GdsHeading1 from '../../gds-heading1/gds-heading1'
import RelatedItems from '../../related-items/related-items'
import React from 'react'
import GdsBackLink from '../../gds-back-link/gds-back-link'

type ContentTemplateProps = {
    pageTitle: string
    children: any
    relatedContent?: any
    backLink?: string
    caption?: string
}

export default function ContentTemplate({ pageTitle, children, relatedContent, backLink, caption }: ContentTemplateProps) {
    return (
        <div className="govuk-width-container app-width-container">
            { backLink ? <GdsBackLink href={backLink} /> : <></> }

            <main className="govuk-main-wrapper app-main-class" id="main-content" role="main">
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-two-thirds">
                        { caption ? <span className="govuk-caption-l">{caption}</span> : <></> }
                        <GdsHeading1>{pageTitle}</GdsHeading1>
                    </div>
                </div>
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-two-thirds">
                        {children}
                    </div>
                    <div className="govuk-grid-column-one-third">
                        { relatedContent ? <RelatedItems relatedItems={relatedContent} /> : <></> }
                    </div>
                </div>
            </main>
        </div>
    )
}