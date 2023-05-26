import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  public user: User;
  public charged: boolean;

  ngOnInit() {
    this.loginService.me().subscribe((user) => {
      this.user = user;
    });
  }
}
