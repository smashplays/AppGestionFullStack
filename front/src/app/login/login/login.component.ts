import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Data } from '../interfaces/login';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public error: boolean = false;
  public mensaje: string;

  @Output() booleanEvent = new EventEmitter<boolean>();

  constructor(private router: Router, private loginService: LoginService) {}

  public name: string;
  public password: string;

  ngOnInit(): void {
    this.loginService.auth().subscribe((res) => {
      if (res) {
        this.router.navigate(['incidencia/home']);
      }
    });
  }

  public userForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  public validateForm(): boolean {
    return this.userForm.invalid;
  }

  public login(): void {
    const data: Data = {
      name: this.name,
      password: this.password,
    };

    this.loginService
      .login(data)
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            console.log(err);
            this.error = !err.error.success;
            this.mensaje = err.error.message;
          }

          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res.success) {
          localStorage.setItem('token', res.data);
          this.booleanEvent.emit(true);
          this.router.navigate(['incidencia/home']);
        }
      });
  }

  public logout(): void {
    if (localStorage.getItem('token')) {
      this.loginService.logout().subscribe((res) => {
        if (res.success) {
          localStorage.removeItem('token');
          this.router.navigate(['']);
        }
      });
    } else {
      console.log('No estas logeado');
    }
  }
}
