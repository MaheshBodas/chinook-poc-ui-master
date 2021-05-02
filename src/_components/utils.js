export function parseDateValue(strDateValue) {
    let vDate = null
    try{
      if (strDateValue !== null && strDateValue !== '' && strDateValue !== undefined) {
        vDate = new Date(strDateValue)
        console.log('parseDateValue vDate')
        console.log(vDate)
      }           
    } catch (err) { 
      vDate = null       
    }
    return vDate
}

export function parseFloatValue(strFloatValue) {
    let fValue = 0.0
    try 
    {   
        // eslint-disable-next-line     
        fValue = parseFloat(strFloatValue.replace(/[^\d\.]/g, ''))
        // Ensure that it is not NaN
        if (isNaN(fValue)) {
            fValue = 0
        }    
    } catch (err) {
      fValue = 0.0
    }
    return fValue
}

export function parseIntValue(strIntergerValue) {
    let iValue = 0
    try{
        if (strIntergerValue !== '' && strIntergerValue!== undefined) {
            iValue = parseInt(strIntergerValue)
        }        
    } catch (err) {
        iValue = 0
    }
    return iValue
}

export function validateNumber(str) {  
  const reg = /^[+-]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/
  return reg.test(str)
}

export function validateCurrency(str) {  
  const reg = /^[+]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/
  return reg.test(str)
}

export function floatToString(floatval) {
  
  let strValue = '0.00'
  if(floatval !== null && floatval !== undefined) {    
      strValue = floatval.toString().replace(/^(?!0$)0+/, '0')       
      // strValue = strValue.replace(/(\.[\d]{2})./g, '$1');  

  }
  return strValue
} 

export function isValidFieldValue(field_value){       
    if (field_value !== null && field_value !== 'null' && field_value !== '' && field_value !== undefined) {
        return true
    }
    return false
}

export function isBlankValue(props) {
    let bIsBlank = false
    const strValue = getInitialValue(props)
    if (strValue !== undefined) {
      if(strValue === '') {
        bIsBlank = true
      }      
    }
    return bIsBlank
  }
  
  export function getInitialValue(props) {
    let strValue = ''
    if(props.isReadOnly) {
        strValue = props.value
    }
    else {
        const {formInputState} = props;
        if((formInputState !== null) || (formInputState !== undefined)) {
          if(typeof(formInputState[props.field_name]) !== "undefined"){
            strValue = formInputState[props.field_name] 
          }
          else {
            strValue = undefined
          }   
        }            
    }
    return strValue
  }  

export function invokeParent(renderFunction, fieldName, stateToPass) {    
    if(renderFunction != null) {
        // console.log(renderFunction)
        // console.log('Utils:invokeParent fieldName stateToPass ' + fieldName, stateToPass)
        renderFunction(fieldName, stateToPass)
    }
}