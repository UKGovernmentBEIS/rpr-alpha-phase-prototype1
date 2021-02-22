import React from 'react'
import GdsBackLink from '../../gds-back-link/gds-back-link'

export default function QuestionTemplate({ children, previousHref }) {
    return (
        <div className="govuk-width-container app-width-container">
            <GdsBackLink href={previousHref} />

            <main className="govuk-main-wrapper app-main-class" id="main-content" role="main">
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-two-thirds">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}