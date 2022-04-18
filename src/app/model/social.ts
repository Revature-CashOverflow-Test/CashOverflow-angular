import { UserAccount } from '../model/user-account';
import { Transaction } from '../model/transaction';

export interface Social {
  id: number;
  username: string;
  profileSub: string;
  owner: null | UserAccount;
}
