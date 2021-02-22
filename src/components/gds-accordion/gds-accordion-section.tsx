export default function GdsAccordionSection({ header, children, id }) {
    return (
      <div className="govuk-accordion__section ">
          <div className="govuk-accordion__section-header">
              <h2 className="govuk-accordion__section-heading">
                  <span className="govuk-accordion__section-button" id={`${id}__heading`}>
                      {header}
                  </span>
              </h2>
          </div>
          <div id={`${id}__content`} className="govuk-accordion__section-content" aria-labelledby={`${id}__heading`}>
              {children}
          </div>
      </div>
    )
}