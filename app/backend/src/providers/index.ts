import BcryptPasswordProvider from './implementations/BcryptPasswordProvider';
import JwtTokenProvider from './implementations/JwtTokenProvider';

const bcryptPasswordProvider = new BcryptPasswordProvider();
const jwtTokenProvider = new JwtTokenProvider();

export { bcryptPasswordProvider, jwtTokenProvider };
