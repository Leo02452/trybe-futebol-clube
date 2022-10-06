const CORRECT_EMAIL = 'user@user.com';
const INCORRET_EMAIL = 'invalid@invalid.com';
const NOT_EMAIL = 'not-email';
const CORRECT_PASSWORD = 'secret_user';
const INCORRECT_PASSWORD = 'wrong_password';
const NOT_VALID_LENGTH_PASSWORD = 'abc';

export const userMock = {
  id: 2,
  username: 'User',
  role: 'user',
  email: CORRECT_EMAIL,
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

export const { password, ...userWithoutPassword } = userMock;

export const userRole = {
  role: userMock.role
}

export const correctBodyLogin = {
  email: CORRECT_EMAIL,
  password: CORRECT_PASSWORD
}

export const loginBodyWithoutEmail = {
  password: CORRECT_PASSWORD
}

export const loginBodyWithoutPwd = {
  email: CORRECT_EMAIL
}

export const loginBodyWithEmptyEmail = {
  email: '',
  password: CORRECT_PASSWORD
}

export const loginBodyWithEmptyPwd = {
  email: CORRECT_EMAIL,
  password: ''
}

export const loginBodyWithNotValidEmail = {
  email: NOT_EMAIL,
  password: CORRECT_PASSWORD
}

export const loginBodyWithNotValidPwd = {
  email: CORRECT_EMAIL,
  password: NOT_VALID_LENGTH_PASSWORD
}

export const loginBodyWithWrongEmail = {
  email: INCORRET_EMAIL,
  password: CORRECT_PASSWORD
}

export const loginBodyWithWrongPwd = {
  email: CORRECT_EMAIL,
  password: INCORRECT_PASSWORD
}