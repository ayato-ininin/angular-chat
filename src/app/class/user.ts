export class User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  initial?: string;
  constructor(user: firebase.User) {
    this.displayName = user.displayName;
    this.uid = user.uid;
    this.email = user.email;
    this.photoURL = user.photoURL;
    this.initial = user.displayName.slice(0, 1);
  }
}
