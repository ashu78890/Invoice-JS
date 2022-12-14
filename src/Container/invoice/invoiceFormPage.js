import React, { useEffect,useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams ,useLocation} from "react-router-dom"
import { invoiceActions, invoiceCloneActions, invoiceUpdateActions } from 'Store/Action/invoiceActions'
import { getInvoiceState,getAccountState } from 'Store/Selector'
import InvoiceForm from './invoiceForm'
import {AccountListActions } from 'Store/Action/AccountActions'
import { Styledbutton } from 'Components/Inputs/button' 
import { Fragment } from 'react'
import { renderAdressOrders } from 'Container/accounts/AccountForm'
import { Button } from 'react-bootstrap'
import queryString from 'query-string'
import Moment from 'moment'



const currentDate = Moment().format("MMMM Do , YYYY");

  
function doConvert(numberInput) {

    let oneToTwenty = ['', 'ONE ', 'TWO ', 'THREE ', 'FOUR ', 'FIVE ', 'SIX ', 'SEVEN ', 'EIGHT ', 'NINE ', 'TEN ',
      'ELEVEN ', 'TWELVE ', 'THIRTEEN ', 'FOURTEEN ', 'FIFTEEN ', 'SIXTEEN ', 'SEVENTEEN ', 'EIGHTEEN ', 'NINETEEN '];
    let tenth = ['', '', 'TWENTY', 'THIRTY', 'FOURTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];

    if (numberInput.toString().length > 7) 
    console.log(numberInput);
    let num = ('0000000' + numberInput).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
    console.log(num);
    if (!num) return;

    let outputText = num[1] != 0 ? (oneToTwenty[Number(num[1])] || `${tenth[num[1][0]]} ${oneToTwenty[num[1][1]]}`) + ' MILLION ' : '';

    outputText += num[2] != 0 ? (oneToTwenty[Number(num[2])] || `${tenth[num[2][0]]} ${oneToTwenty[num[2][1]]}`) + 'HUNDRED ' : '';
    outputText += num[3] != 0 ? (oneToTwenty[Number(num[3])] || `${tenth[num[3][0]]} ${oneToTwenty[num[3][1]]}`) + ' THOUSAND ' : '';
    outputText += num[4] != 0 ? (oneToTwenty[Number(num[4])] || `${tenth[num[4][0]]} ${oneToTwenty[num[4][1]]}`) + 'HUNDRED ' : '';
    outputText += num[5] != 0 ? (oneToTwenty[Number(num[5])] || `${tenth[num[5][0]]} ${oneToTwenty[num[5][1]]} `) : 'Lakh';

    return outputText;
  }


// const Add =new Address();
const InvoiceFormPage = (props) => {
  const history= useHistory();
  const location=useLocation();
  const {search} = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { invoice } = useSelector(getInvoiceState);
  const {list, raw }= useSelector(getAccountState);
  const [AccountOptions, setAccountOptions] = useState([]);
  const [isCloned, setIsCloned] = useState(false);
   const clone = new URLSearchParams(search).get('clone')
   
  useEffect(()=>{
    const queryParams = queryString.parse(search); 
    console.log(queryParams)
    if(id && clone ==='true' ){
      setIsCloned(true)
    }
    // check id and clone true // then set is clone true

  },[search])



  useEffect(() => {
    if (id) {
      dispatch(invoiceActions.request({ id }));
    }
  }, [id]);
  
  useEffect(() => {
    if(!list) {
      // api call dipatch
      console.log("call api")
      dispatch(AccountListActions.request());
    } else {
      // generate options
      console.log("generate options");
      const options= [];
      list.forEach(item => {
        const AccountDetail = raw[item]
        options.push({label: AccountDetail.name, value: AccountDetail.id })
      })
      setAccountOptions(options);
    }
  }, [list]);

// useEffect(() =>{
//   const options = [];
//   list.forEach(item => {
//     const AdressDetail = raw[?.map(renderAdressOrders)]
//     options.push({label:AdressDetail.adress, value:AdressDetail.id})
//   })
//   setAdressOptions(options);
  
// })


  

  const handleFormSubmit = (formData) => {
    let total = 0;
    formData.descriptions.forEach(({ amount }) => {
      total += parseInt(amount);
      history.push('/Invoice')
    })

    const AccountDetail = raw[formData.AccountFirm.value];
    formData = {
      ...formData,
      AccountFirm: AccountDetail,
      invoicedRaisedBy: "Ashutosh Sharma",
      firmDetail: {
        name: "Biz Tecno",
        addressLine1: "Plot J7, FCS Building, Rajiv Gandhi Technology Park",
        addressLine2: "Chandigarh ??? 160101",
        telephone: "+91 9781918447",
        account: {
          bankName: "ICICI BANK LTD.",
          beneficiaryName: "Biz Tecno",
          accountNumber: "632205009436",
          ifscCode: "ICIC0006322",
          swiftCode: "ICICINBBCTS",
          panCard: "BYOPS0301M",
          bankAddress: "S.C.O. No.485-486, Sector 35-C, Chandigarh ??? 160022"
        }
      },
      totalAmount: total,
      totalAmountInWords: doConvert(total),
    }

    if(isCloned) {
      delete formData.id
    }

    dispatch(invoiceUpdateActions.request(formData));
  }
  return (
    <Fragment>
      <Button variant='outline-dark' onClick={() => history.push("/invoice")}>Back</Button>
      {/* <InvoiceForm   handleFormSubmit={handleFormSubmit} initialValues={id ? {...invoice, AccountFirm: {label: invoice.AccountFirm && invoice.AccountFirm.name, value: invoice.AccountFirm && invoice.AccountFirm.id}} : { invoiceDate: currentDate }} /> */}
      <InvoiceForm AccountOptions={AccountOptions} handleFormSubmit={handleFormSubmit} initialValues={id ? {...invoice, AccountFirm: {label: invoice && invoice.AccountFirm && invoice.AccountFirm.name, value: invoice && invoice.AccountFirm && invoice.AccountFirm.id}} : { invoiceDate: currentDate }} />
    </Fragment>
  )
}
export default InvoiceFormPage;