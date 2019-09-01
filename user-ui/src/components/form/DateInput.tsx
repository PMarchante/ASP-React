import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Form, Label } from 'semantic-ui-react'
import { DateTimePicker } from 'react-widgets'

interface IProps
  extends FieldRenderProps<Date, HTMLInputElement>,
    FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  width,
  type,
  date = false,
  time = false,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <DateTimePicker
        placeholder={placeholder}
        value={input.value || null}
        onChange={input.onChange}
        date={date}
        time={time}
        onBlur={input.onBlur} //notifies component that its been touched
        onKeyDown={e => e.preventDefault()} //prevents typing in the date and time field
        {...rest}
      />

      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  )
}

export default DateInput
