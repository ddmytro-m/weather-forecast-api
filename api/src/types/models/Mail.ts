export class Mail {
  constructor(
    public email: string,
    public subject: string,
    public template: string,
    public context: Record<string, unknown>,
  ) {}
}
