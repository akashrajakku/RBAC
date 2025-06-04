function Button({ disableFlag, label, onClick, className = '', textClassName = '' }) {
  return (
    <button
      type="button"
      className={`text-white bg-gray-900 w-1/4 hover:bg-black font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      <span className={textClassName}>{label}</span>
    </button>
  );
}

export default Button;