type GdsCellProps = {
    id?: string
    children: any
}

export default function GdsCell({ id, children }: GdsCellProps) {
    return (
        <td id={id} className="govuk-table__cell">
            {children}
        </td>
    )
}