import './hoverButton.css'

export function InteractiveHoverButton({ children, className = '', ...props }) {
  return (
    <button className={`hover-button ${className}`} {...props}>
      <span className="hover-button__default">
        <span className="hover-button__dot" />
        <span className="hover-button__label">{children}</span>
      </span>
      <span className="hover-button__reveal">
        <span>{children}</span>
      </span>
    </button>
  )
}

export default InteractiveHoverButton
