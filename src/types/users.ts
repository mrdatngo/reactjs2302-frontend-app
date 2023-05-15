interface IAddress {
  province: string;
  street: string;
}

interface IUserInfo {
  id: number;
  email: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: IAddress;
  active: boolean;
}

type ListUser = IUserInfo[];

export type { IAddress, IUserInfo, ListUser };
