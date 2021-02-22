import GdsList from "../gds-list/gds-list";

export default function GdsBullets({ children, id }) {
    return (
        <GdsList id={id} className="govuk-list--bullet">{children}</GdsList>
    )
}