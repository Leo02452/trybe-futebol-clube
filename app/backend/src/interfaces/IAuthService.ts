export default interface IAuthService {
  login(email: string, pwd: string): Promise<string>
}
