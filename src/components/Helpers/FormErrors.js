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
          case "password2":
            fieldShow="Las contraseñas"
            break;
          case "direction":
            fieldShow="La dirección"
            break;
          case "description":
            fieldShow="La descripción"
            break;
          case "dateTime":
            fieldShow="La fecha"
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