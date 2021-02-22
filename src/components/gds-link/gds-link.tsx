import Link from 'next/link'

export default function GdsLink({ children, href }) {
    return (
        <Link href={href}>
            <a className="govuk-link">{children}</a>
        </Link>
    )
}