import './styles.css'

export const Button = ({
    children,
    onClick,
    disabled
}) => {
    return (
        <button
            className="button"
            disabled={disabled}
            onClick={onClick}>
            {children}
        </button>
    )
}