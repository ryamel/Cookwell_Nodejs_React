

function validateEmail(mail) {

  if ( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail) ) {
    return (true);
  } else {
    return (false);
  }
}


function validatePwd(pwd, repeatPwd) {

  if ( pwd !== repeatPwd ) return false;
  if ( pwd.length < 8 ) return false;
  console.log(pwd);
  console.log(repeatPwd);
  return true;
}



exports.validateEmail = validateEmail;
exports.validatePwd = validatePwd;