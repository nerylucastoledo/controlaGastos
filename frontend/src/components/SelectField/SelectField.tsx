interface IInput extends React.ComponentProps<'select'> {
  label: string;
  name: string;
  options: string[];
  defaultValue: string;
}

const SelectField = ({ label, name, options, defaultValue, ...props }: IInput) => {
  return (
    <div className='select-group'>
      {label && <label htmlFor={name}>{label}</label>}
      
      <select name={name} defaultValue={defaultValue} {...props}>
        {options && options.map((option, index) => (
          <option key={`${option} - ${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  )
}

export default SelectField;