import GdsLink from "../gds-link/gds-link"
import styles from './related-items.module.scss'

export type RelatedItem = {
    href: string
    label: string
}

export type RelatedItemsProps = {
    relatedItems: RelatedItem[]
}

export default function RelatedItems({ relatedItems }) {
    const listItems = relatedItems.map((item, i) => <li key={`related-items__${i}`}><GdsLink href={item.href}>{item.label}</GdsLink></li>)

    return (
        <aside className={styles['app-related-items']} role="complementary">
            <h2 className="govuk-heading-m" id="related-content-title">
                Related Content
            </h2>
            <nav role="navigation" aria-labelledby="related-content-title">
            <ul className="govuk-list govuk-!-font-size-16">
                {listItems}
            </ul>
            </nav>
        </aside>
    )
}