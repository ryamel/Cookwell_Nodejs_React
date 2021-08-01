
// used in /api/users/register route 

function validateEmail(mail) {

  if ( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail) ) {
    return (true);
  } else {
    return (false);
  }
}




exports.validateEmail = validateEmail;
