const responseMessage = {
  userSignupSuccess: 'Your account has been created successfully!',
  alreadyExistEmailOrUsername: 'The user with the provided email or username already exists',
  invalidFirstname:
    'The first name should consist of alphabets and at least 3 minimum characters, without whitespaces or special characters',
  invalidLastname:
    'The last name should consist of alphabets alphabets and at least 3 minimum characters, without whitespaces or special characters',
  invalidEmail: 'Email should look like example@email.com',
  invalidGender: 'Gender should be male or female',
  invalidPassword:
    'Password should consists of alphabets, capital letter, special characters, numbers and at least 8 characters minimum',
  invalidType: 'user type must be client or admin',
  tokenMissing: 'the token is missing',
  tokenInvalid: 'the token is invalid',
  notAllowed: 'you are not allowed for this service',
  notUserExist: 'the user does not exist',
  wrongcredentials: 'the email or password is incorrect', 
  sameType:'That is the existing type',
  typeAssigned:'The type is successfully changed',
  deleted:'Deleted successfully',
  allUsers:'All available users',   
}
export default responseMessage;