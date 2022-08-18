export default interface IJwtService {
  signUp(payload: { id: number, email: string }): Promise<string>;
}
