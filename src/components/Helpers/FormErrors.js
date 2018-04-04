import React from 'react';

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      var fieldShow = ''
      if(formErrors[fieldName].length > 0){
        switch(fieldName){
          case 'name':
            fieldShow="El nombre"
            break;
          case 'lastname':
            fieldShow="El apellido"
            break;
          case 'phone':
            fieldShow="El numero de teléfono"
            break;
          case 'user':  
            fieldShow="El nombre de usuario"
            break;
          case "email":
            fieldShow="El correo electronico"
            break;
          case "password":
            fieldShow="La contraseña"
            break;
          default:
            break;
        }
            
        return (
            <p key={i} style={{color: "red"}}>{fieldShow} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>