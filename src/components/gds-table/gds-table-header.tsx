type GdsTableHeaderProps = {
    id?: string
    children: any
}

export default function GdsTableHeader({ id, children }: GdsTableHeaderProps) {
    return (
        <td id={id} className="govuk-table__cell">
            {children}
        </td>
    )
}