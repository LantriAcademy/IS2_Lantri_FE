/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* React File Base64 - Version@1.0.0
*
*/

import React from 'react';

export default class SecurePassword {

  static async GetPasswordFile() {
    var response = await fetch("./PasswordInsecure.txt");
    return response;
  }
}
