import React,{ Fragment } from 'react';
import { Styledbutton } from 'Components/Inputs/button'
import FormInput from 'Components/Inputs/formInputs'
import { Styledheader } from 'Components/Inputs/header'
import { useLocation } from 'react-router-dom';
import { renderInvoiceOrders } from 'Components/Inputs/fieldarray'
import { RenderSelectInput } from 'Components/selectComponent/selectComponent'
import { Field, Form, reduxForm, FieldArray } from 'redux-form'
import { FormContainer, FormHeaderContainer } from './invoicePDF/FormStyling'
import { required } from 'Util/validate';
import DropzoneComponent from 'Components/Dropzone/DropzoneComponent';
import Toggle from 'Components/Toggle';
const invoiceForm = (props) => {

  const { handleSubmit, handleFormSubmit, AccountOptions,AccountDetails } = props
//   function currencyFormat(num) {
//    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
// }
const validate = (values)=>{
  const errors ={}
  const regax = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
if(!values.currency){
  errors.currency = "required"
}else if(!regax.test(values.currency)){
  errors.currency ="this is not valid format"
}
}

  return (

    <Fragment>
      <FormContainer>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormHeaderContainer>
          <Field
            name="invoiceDate"
            component={FormInput}

            
            type="text"
            placeholder="invoiceDate"
            label="Date"
          />
          <Field
            name="purposeofInvoice"
            type="text"
            placeholder='Purpose of Invoice'
            component={FormInput}
            validate={[required]}
            label="Purpose of Invoice"
          />
          </FormHeaderContainer>
          <FormHeaderContainer>
          <Field
            name="invoiceNumber"
            type="text"
            placeholder='Invoice Number'
            label="Invoice Number"
            component={FormInput} 
            validate={[required]}
            />
            <Field
            name="currencyType"
            type="text"
            placeholder='Currency type'
            component={FormInput}
            validate={[required]}
            label="Currency Type"
          /> </FormHeaderContainer>
          <Field
            name="AccountFirm"
            component={RenderSelectInput}
            options= {AccountOptions}
          />

          <Field
          name= "address"
          component={RenderSelectInput}
          options= {AccountOptions}
          />
          
          <FieldArray name="descriptions" component={renderInvoiceOrders} />
          
          <Styledbutton>Submit</Styledbutton>
          <DropzoneComponent/>
          <Toggle/>
        </Form>
      </FormContainer>
      </Fragment>
  );
}

export default reduxForm({
  form: "invoiceForm",
  enableReinitialize: true,
})(invoiceForm);