export class User {
  displayName?: string | null;
  email: string |null;
  photoURL?: string | null;
  uid: string;
  initial?: string | undefined;
  constructor(user: firebase.User) {
    this.displayName = user.displayName;
    this.uid = user.uid;
    this.email = user.email;
    this.photoURL = user.photoURL;
    this.initial = user.displayName?.slice(0, 1);
  }
}
