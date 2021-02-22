export type GdsTabsProps = {
    title: string
    children: any[]
    tabTitles: GdsTab[]
    id?: string
    className?: string
}

export type GdsTab = {
    id: string
    tab: any
}

export default function GdsTabs({ children, title, tabTitles, id, className }: GdsTabsProps) {
    id = id || 'tabs'
    className = `govuk-tabs${className ? ` ${className}` : ''}`

    const tabTitleComponents = tabTitles.map((tabTitle, i) => (
        <li key={`${id}__tabtitle__${i}`} id={`${id}__tabtitle__${i}`} className="govuk-tabs__list-item">
            <a className="govuk-tabs__tab" href={`#${tabTitle.id}`}>
                {tabTitle.tab}
            </a>
        </li>
    ))

    const tabs = children.map((tab, i) => {
        let className = 'govuk-tabs__panel'

        if (i > 0) className += ' govuk-tabs__panel--hidden'

        return (
            <div className={className} key={`${id}__tab__${i}`} id={tabTitles[i].id}>
                {tab}
            </div>
        )
    })

    return (
        <div id={id} className={className} data-module="govuk-tabs">
            <h2 className="govuk-tabs__title">
                {title}
            </h2>
            <ul className="govuk-tabs__list">
                {tabTitleComponents}
            </ul>
            {tabs}
        </div>
    )
}
