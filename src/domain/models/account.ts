export interface AccountModel {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface AddAccountModel extends Omit<AccountModel, "id"> {}
