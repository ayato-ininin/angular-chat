import { User } from './user';

export class Comment {
  date: number;
  user: User;
  message: string;
  key?: string;
  isEdit?: boolean;

  constructor(value: any) {
    // valueにすることで、何でも受け取れるようにしてる。実際はオブジェクトが来る
    this.user = value.user;
    this.message = value.message;
    this.date = value.data || Date.now();
    if (value.key) {
      this.key = value.key;
    }
  }

}
