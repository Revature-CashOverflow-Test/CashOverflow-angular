import { UserAccount } from '../model/user-account';

export interface Social {
  id: number;
  username: string;
  profileSub: string;
  owner: null | UserAccount;
}
