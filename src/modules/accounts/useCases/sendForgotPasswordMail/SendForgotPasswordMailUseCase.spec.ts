import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail Password", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot mail password to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "601637",
      email: "paptelfuv@ivo.sj",
      name: "Birdie Rowe",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("paptelfuv@ivo.sj");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an e-mail if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("voge@ciknif.zm")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "427591",
      email: "pizpubok@tediz.im",
      name: "Betty Roy",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("pizpubok@tediz.im");

    expect(generateTokenMail).toBeCalled();
  });
});
