import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged(user => console.log(user));
  }
  // create(email: string, password: string): Promise<void>{
  //   return this.afAuth.createUserWithEmailAndPassword(email, password)
  //     .then((credential) => {
  //       const { user } = credential;
  //       const actionCodeSettings = {
  //         url: `http://localhost:4200/?newAccount=true&email=${user!.email}`
  //       };
  //       user!.sendEmailVerification(actionCodeSettings);
  //     })
  //   // createUserWithEmailAndPassword＝＞このメソッドは、firebaseのもので、promiseを返すように、設定されている。
  //   // その下のcredentialのとこが、メール確認を送信してくれる！
  // }
  // ↓のように、promiseを使うことで、データをしっかり取ってから、操作を行うように非同期にできる。
  // authService.create(email,password)
  // .then((credential) => credential)
  // .catch((error)=>error)

  logout(): Promise<void>{
    return this.afAuth.signOut();
  }
  // これだけでlogout!!

  login(email: string, password: string): Promise<firebase.auth.UserCredential | void>{
    // この型指定は、もし値がかえってこれば、userCredentialが返ってきて、そうでなければ返ってこないので、voidのunion型
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => console.error(error));
  }
}
