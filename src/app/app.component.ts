import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';

import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, '五十川洋平');
const ANOTHER_USER: User = new User(2, '竹井賢治');

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'お疲れさまです。' ) ,
  new Comment(ANOTHER_USER, 'この間の件ですが、どうなりましたか？'),
  new Comment(CURRENT_USER, 'お疲れさまです。'),
  new Comment(CURRENT_USER, 'クライアントからOK。' )
]

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments = COMMENTS;
  currentUser = CURRENT_USER;
  comment = "";

  addComment(comment: string) {
    if (comment) {
      this.comments.push(new Comment(this.currentUser, comment));
    }

  }
}
