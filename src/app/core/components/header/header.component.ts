
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ac-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin!: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private AuthService:AuthService
  ) { }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user: firebase.User | null) => {
      this.isLogin = !!user;
      // onAuthstateChangedは、ログイン状態が切り替わるたびに発動されるもので、切り替われば、毎回実行！
      // !!　この2つは、真偽値に変えてくれるもので、userがあればtrue,なければfalseになるようにできてる。
    });
  }

  logout(): void{
    this.AuthService.logout()
      .then(() => this.router.navigateByUrl('/login'));
  }

}
