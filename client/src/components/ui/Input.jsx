
const Input = ({label, type = 'text', name, placeholder = '', value, onChange, textColor="black"}) => {
  return (
    <div className={`flex flex-col gap-1 p-3`}>
      {label && (
        <label htmlFor={name} className={`text-sm font-medium text-${textColor} mb-1`}>
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`px-3 py-2 w-full border border-${textColor} text-${textColor} rounded-md focus:outline-none p-2  focus:ring-${textColor} placeholder-gray-400`}
      />

    </div>
  );
};

export default Input;
