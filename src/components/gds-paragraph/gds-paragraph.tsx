export type GdsParagraphProps = {
    children: any
    id?: string
    className?: string
}

export default function GdsParagraph({ children, id, className }: GdsParagraphProps) {
    className = `govuk-body${className ? ` ${className}` : ''}`

    return (
        <p id={id} className={className}>{children}</p>
    )
}