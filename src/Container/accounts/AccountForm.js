import React, { Fragment } from 'react'
import { Styledbutton } from 'Components/Inputs/button'
import { required } from 'Util/validate'
import { Field, Form, reduxForm,FieldArray } from 'redux-form'
import FormInput from 'Components/Inputs/formInputs'
import { FormContainer, FormHeaderContainer } from 'Container/invoice/invoicePDF/FormStyling'
import { Styledheader } from 'Components/Inputs/header'
//import {FieldArray} from 'redux-form/lib/FieldArray'


export const renderAdressOrders = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <ul>
      {submitFailed && error && <span>{error}</span>}
    </ul>
    {fields.map((item, index) => (
      <ul key={index}>
        <Styledbutton
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        >Remove</Styledbutton>

        
        <ul><Field
          name={`${item}.address`}
          component={FormInput}
          validate={[required]}
          label={<Styledheader>Address {index + 1}</Styledheader>}
        />
        </ul>
            {/* <ul><Field
          name={`${item}.phonenumber`}
          component={FormInput}
          validate={[required]}
          label={<Styledheader>Contact {index + 1}</Styledheader>}
        /></ul> */}

      </ul>
    )
    )
    }
    <ul>
      <Styledbutton type="button" onClick={() => fields.push({})}>
        Add Account Details
      </Styledbutton>
      {submitFailed && error && <span>{error}</span>}
    </ul>
  </ul>
)
const normalizePhone = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
    6,
    10
  )}`
}

// export default normalizePhone
const AccountForm = (props) => {
  const { handleSubmit, handleFormSubmit } = props
  // console.log('fieldarray', handleFormSubmit)
  return (
    <Fragment>
      <FormContainer>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
         
          <Field
            name="name"
            placeholder='Name'
            component={FormInput}
            validate={[required]}
            normalize={normalizePhone}
            label="Name"
          />
          <FieldArray name="details" component={renderAdressOrders} />
        
          <Styledbutton>Submit</Styledbutton>
        </Form>
      </FormContainer>
    </Fragment>
  )
}

export default reduxForm({
  form: "AccountForm",
})(AccountForm);
