import { FormGroup, Label } from 'reactstrap'

export interface ITextAreaFieldProps {
  label?: string
  name: string
  value: string
  onChange: (param1: { name: string; value: string }) => void
  error?: string
  disabled?: boolean
  placeholder?: string
  rows: number
}
const TextAreaField = ({
  name,
  rows,
  label,
  onChange,
  value,
  error
}: ITextAreaFieldProps) => {
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }

  return (
    <FormGroup>
      <Label>{label}</Label>
      <div className='input-group has-validation'>
        <textarea
          className={getInputClasses()}
          id={name}
          rows={rows}
          onChange={(e) =>
            onChange({ name: e.target.name, value: e.target.value })
          }
          name={name}
          value={value}
        />
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </FormGroup>
  )
}
TextAreaField.defaultProps = {
  rows: '3'
}

export default TextAreaField
