type GdsTableProps = {
    id: string
    caption?: string
    columnHeaders: string[]
    children: any
}

export default function GdsTable({ id, caption, columnHeaders, children }: GdsTableProps) {

    const columnHeaderElements = columnHeaders.map((columnHeader, i) => <th key={`${id}__column-header__${i}`} id={`${id}__column-header__${i}`} scope="col" className="govuk-table__header">{columnHeader}</th>)

    return (
        <table id={id} className="govuk-table">
            { caption ? <caption className="govuk-table__caption">{caption}</caption> : <></> }
            <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                    {columnHeaderElements}
                </tr>
            </thead>
            <tbody className="govuk-table__body">
                {children}
            </tbody>
        </table>
    )
}