import GdsBullets from "../gds-bullets/gds-bullets";
import GdsParagraph from "../gds-paragraph/gds-paragraph";

export default function GdsBulletList({ description, children, id }) {
    return (
        <>
            <GdsParagraph id={`${id}__desc`}>{description}</GdsParagraph>
            <GdsBullets id={`${id}__list`}>{children}</GdsBullets>
        </>
    )
}