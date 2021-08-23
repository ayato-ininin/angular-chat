export class User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  initial: string;
  constructor(user: firebase.User) {
    this.displayName = user.displayName;
    this.uid = user.uid;
    this.email = user.email;
    this.photoURL = user.photoURL;
    if (user.displayName) {
      this.initial = user.displayName.slice(0, 1);
    } else {
      this.initial = '';
    }

  }
}
