import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'JPD Gestión Incidencias';

  public localStorage = localStorage;

  constructor(private router: Router, private loginService: LoginService) {}

  public opened: boolean = false;

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
    } else {
      console.log('No estas logeado');
    }
  }

  public sidebarItems = [
    { label: 'Inc. pendientes', icon: 'label', url: '/incidencia/listado' },
    { label: 'Inc. terminadas', icon: 'label', url: '/terminado/listado' },
    {
      label: 'Crear incidencia',
      icon: 'add',
      url: '/incidencia/formulario',
    },
    { label: 'Clientes', icon: 'label', url: '/cliente/listado' },
    { label: 'Crear cliente', icon: 'add', url: '/cliente/formulario' },
  ];
}
