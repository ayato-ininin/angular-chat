import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, '五十川洋平');
const ANOTHER_USER: User = new User(2, '竹井賢治');



@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;
  // angularfirelistにすると、db.listの値が受け取れる。List参照が格納

  currentUser = CURRENT_USER;
  comment = "";
  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges();
    // これを指定することで、リアルタイムデータベースでitemから単一データを取得できて、observableに変える。
    this.commentsRef = db.list('/comments');
    // this.comments$ = this.commentsRef.valueChanges();
    // ただ、このvalueChangesはlistの実データのみ取得して、keyを取得していない。これじゃ更新作業とかができない。↓↓
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
}
