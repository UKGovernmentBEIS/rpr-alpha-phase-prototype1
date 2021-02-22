export type GdsListProps = {
    children: any[]
    className?: string
    id: string
}

export default function GdsList({ children, className, id }: GdsListProps) {
    className = `govuk-list ${className}`
    const listItems = children.map((item, i) => <li key={`${id}__item__${i}`} >{item}</li>)

    return (
        <ul className={className}>
            {listItems}
        </ul>
    )
}