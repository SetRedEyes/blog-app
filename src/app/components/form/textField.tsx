import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

export interface ITextFieldProps {
  label: string
  name: string
  value: string
  onChange: (param1: { name: string; value: string }) => void
  error: string
  disabled?: boolean
  placeholder: string
}

const TextField = ({
  label,
  name,
  value,
  onChange,
  error,
  disabled,
  placeholder
}: ITextFieldProps) => {


  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }
  return (
    <FormGroup>
      <Label >{label}</Label>
      <Input
        type='text'
        value={value}
        id={name}
        name={name}
        onChange={(e) =>
          onChange({ name: e.target.name, value: e.target.value })
        }
        disabled={disabled}
        placeholder={placeholder}
        className={getInputClasses()}
      />

      {error && (
        <FormFeedback className='d-flex' type='invalid'>
          {error}
        </FormFeedback>
      )}
    </FormGroup>
  )
}

export default TextField
