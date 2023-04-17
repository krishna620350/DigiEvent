import React from 'react'

const FormErrorMessage = ({errorMessage}) => {
    if(errorMessage){
        return <div className='errorBox'>{errorMessage}</div>
    }else
    return null;
  
}

export default FormErrorMessage;