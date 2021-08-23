import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

import { Comment } from '../class/comment';
import { User } from '../class/user';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  comments$!: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;
  // angularfirelistにすると、db.listの値が受け取れる。List参照が格納

  currentUser: User;
  comment = "";


  constructor(private db: AngularFireDatabase,
  private afAuth:AngularFireAuth) {
    // this.item$ = db.object('/item').valueChanges();
    // これを指定することで、リアルタイムデータベースでitemから単一データを取得できて、observableに変える。
    this.commentsRef = db.list('/comments');
    // this.comments$ = this.commentsRef.valueChanges();
    // ただ、このvalueChangesはlistの実データのみ取得して、keyを取得していない。これじゃ更新作業とかができない。↓↓


  }
  ngOnInit(): void {
// ログイン情報をobservableで参照する↓↓authstate
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      if (user) {
        this.currentUser = new User(user);
        console.log(this.currentUser);
        console.log(this.currentUser.initial);
      }
    });

   this.comments$ = this.commentsRef.snapshotChanges()
    .pipe(
      map((snapshots: SnapshotAction<Comment>[]) => {
        // まずここでkeyを含めたメタデータを取得
        return snapshots.map(snapshot => {
          const value = snapshot.payload.val();
           // payload.val、ー＞ここで実データを取得・
          return new Comment({ key: snapshot.payload.key, ...value });
          // このcomments$には、新たに、今までの値をvalueに含め、keyという新たなプロパティを足して、配列を作り変えている！！！！
          // コレ自体、pushしてないから、多分データには反映されない。
          // 追加されたcommentsRefにkeyを追加して、もう一回配列を入れている！！
      })
    })
  )
  }

  addComment(comment: string) {
    if (comment) {
      this.commentsRef.push(new Comment({ user:this.currentUser, message:comment }));
      // AngularFireDatabaseにpushすることで、list追加になる。db.listにすると、値の追加とかが可能。
      this.comment = "";
    }

  }
  updateComment(comment: Comment): void{
    const { key, message } = comment;
    this.commentsRef.update(key!, { message });
    // upadateメソッドを使うことで、コメントの配列から、keyをみて、挿入したい文字をいれれば更新がかかる。
    // ここのコメントは、comments$の中身やから、キーとvalueが入ってて、それを使用している！そのために、キーを付けて、comments$しておくとよい。ただ、更新とか削除メソッドは、リストのcommentsRefに対して行う。
  }
  deleteComment(comment: Comment): void{
    this.commentsRef.remove(comment.key);
    // キーを渡せば削除！！
  }



}
