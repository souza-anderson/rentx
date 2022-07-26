interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    varibles: any,
    path: string
  ): Promise<void>;
}

export { IMailProvider };
