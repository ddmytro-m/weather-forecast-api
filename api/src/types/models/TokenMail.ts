import { Mail } from "./Mail"

export class TokenMail extends Mail {
  constructor(email: string, token: string) {
    super(email, "Confirmation Token", "token", { token })
  }
}
