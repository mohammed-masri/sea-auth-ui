import { IAccount } from "../account";

export interface ILoginResponse {
  accessToken: string;

  account: IAccount;
}
