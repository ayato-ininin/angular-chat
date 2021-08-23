import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Initial = '';

  constructor(
    private afAuth: AngularFireAuth,
    private db :AngularFireDatabase
  ) { }
  create(email: string, password: string): Promise<void>{
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        const { user } = credential;
        const actionCodeSettings = {
          url: `http://localhost:4200/?newAccount=true&email=${user.email}`
        };
        user.sendEmailVerification(actionCodeSettings);
        // this.db.object(`/users/${user!.uid}`).set({ uid: user!.uid, email: user!.email });
        // ↓のようにインスタンスにしていれると、必要なデータは全て入れれる。
        this.db.object(`/users/${user.uid}`).set(new User(user))
        .catch(error => console.error(error));

      })
    // createUserWithEmailAndPassword＝＞このメソッドは、firebaseのもので、promiseを返すように、設定されている。
    // その下のcredentialのとこが、メール確認を送信してくれる！
  }

  // ここでプロフィールの名前と画像を登録。まず、その名前と写真のURLを引数に取る。
  update(values: { displayName?: string, photoURL?: string }): Promise<void>{
    console.log(values)
    // currentUserは、現在ログインしてるuserのデータを取得できる。
    return this.afAuth.currentUser.then((user: firebase.User | null) => {
      // そのuserデータを取ってくる。
      if (user) {
        user.updateProfile(values)
          // ↑ここでまず、authentificationにデータを保存
          .then(() => this.db.object(`/users/${user.uid}`).update(values))
          // .then(() => this.db.object(`/users/${user.uid}`).update({ initial: this.Initial}))
          // ↑そんで、ここでリアルタイムデータベースにも保存して、二回保存
          .catch(error => console.error(error));
      }
    })
  }
}
