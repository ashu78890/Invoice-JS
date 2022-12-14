import { Field } from 'redux-form'
import { Styledbutton } from 'Components/Inputs/button'
import { Styledheader } from 'Components/Inputs/header'
import { FormHeaderContainer } from 'Container/invoice/invoicePDF/FormStyling'
import FormInput from './formInputs'
import { normalizeNo, required } from 'Util/validate'

export const renderInvoiceOrders = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
      <ul>
        {submitFailed && error && <span>{error}</span>}
      </ul>
      {fields.map((member, index) => (
        <ul key={index}>
          <Styledbutton
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}
          >Remove</Styledbutton>
          <Styledheader>Description and Amount {index + 1}</Styledheader>
          <FormHeaderContainer>
            
          <Field
            name={`${member}.detail`}
            type="text"
            component={FormInput}
            validate={[required]}
            label="Description"
          />
          <Field
            name={`${member}.type`}
            type="text"
            component={FormInput}
            validate={[required]}
            label="Type"
          />
          </FormHeaderContainer>
          <Field
            name={`${member}.amount`}
            component={FormInput}
            validate={[required]}
            normalize={normalizeNo}
            label="Amount"
           
          />
        </ul>
        
      ))}
      <ul>
      <Styledbutton type="button" onClick={() => fields.push({})}>
          Add Description
        </Styledbutton>
        {submitFailed && error && <span>{error}</span>}
      </ul>
    </ul>
  )