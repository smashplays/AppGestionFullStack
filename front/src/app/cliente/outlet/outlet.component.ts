import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
})
export class OutletComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  public user: User;

  ngOnInit(): void {
    this.loginService.me().subscribe((user) => {
      this.user = user;
    });
  }

  public main(): void {
    this.router.navigate(['incidencia/home']);
  }

  public logout(): void {
    if (localStorage.getItem('token')) {
      this.loginService.logout().subscribe((res) => {
        if (res.success) {
          localStorage.removeItem('token');
          this.user = null;
          this.router.navigate(['']);
        }
      });
    }
  }

  public sidebarItems = [
    {
      label: 'Inc. pendientes',
      icon: 'pending_actions',
      url: '/incidencia/listado',
    },
    { label: 'Inc. terminadas', icon: 'done', url: '/terminado/listado' },
    { label: 'Clientes', icon: 'label', url: '/cliente/listado' },
  ];
}
