
interface IInput extends React.ComponentProps<'input'> {
  label: string;
}

const InputField = ({ label, name, ...props }: IInput) => {
  return (
    <div className='form-group'>
      {label && <label htmlFor={name}>{label}</label>}
      <input 
        name={name}
        className='form-control'
        {...props}
      />
    </div>
  )
}

export default InputField;