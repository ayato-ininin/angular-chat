import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// commonmoduleはmoduleに絶対必用な機能が入ってる。
import { FormsModule } from '@angular/forms';
import { CommentDatePipe } from '../pipes/comment-date.pipe';


@NgModule({
  declarations: [
    CommentDatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    CommentDatePipe
  ]
})
export class SharedModule { }
