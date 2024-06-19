interface IInput extends React.ComponentProps<'input'> {
  label: string;
  errorMessage: string;
}

export const InputField = ({ label, name, errorMessage, ...props }: IInput) => {
  return (
    <div className='form-group'>
      {label && <label htmlFor={name}>{label}</label>}
      <input 
        name={name}
        id={name}
        {...props}
      />
      {errorMessage &&  <p className='input-error'>{errorMessage}</p>}
    </div>
  )
}