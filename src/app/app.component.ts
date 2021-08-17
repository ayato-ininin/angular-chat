import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';



@Component({
  selector: 'ac-root',
  template: `
  <ac-header></ac-header>
  <div class="page">
    <router-outlet></router-outlet>
  </div>
  `,
  // ここでも指定ができる！
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
