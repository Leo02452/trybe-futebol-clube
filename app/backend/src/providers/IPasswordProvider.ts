export default interface IPasswordProvider {
  encrypt(password: string): Promise<string>
  validate(password: string, hashPassword: string): Promise<boolean>
}
