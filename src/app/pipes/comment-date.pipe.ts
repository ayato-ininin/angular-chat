import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commentDate'
})
export class CommentDatePipe implements PipeTransform {

  transform(value: number, ...args: string[]): string {
    // valueはテンプレートから値が渡ってくる！
    // ...argsはテンプレートからオプションが渡ってくる！:をつなげれば、オプションたくさんつけれるから、可変長引数。
    const format = args[0] || 'yyyy年MM月dd日 HH:mm';
    // これは、なにかオプションがあれば、それ使うし、そうじゃなければ右の形式になる！
    return formatDate(value, format, 'en-US');
    // formatDateの関数は、実際のDateパイプにも使われてて、これ使えば、dateパイプみたいな振る舞いができる！
  }

}
