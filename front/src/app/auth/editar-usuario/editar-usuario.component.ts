import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
})
export class EditarUsuarioComponent implements OnInit {
  public passwordMatch: boolean;
  public roleCorrect: boolean = false;

  public user: User;
  public login: User;

  ngOnInit(): void {
    this.loginService.me().subscribe((user) => {
      this.login = user;
    })
    this.paramMapSubscription();
  }

  private paramMapSubscription(): void {
    this.route.paramMap.subscribe((params) => {
      this.userService.getUserById(+params.get('id')).subscribe((user) => {
        this.user = user;
      });
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  public userForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    rpassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl(null, [Validators.required]),
  });

  public validateForm(): boolean {
    return this.userForm.invalid;
  }

  public editar(): void {
    Swal.fire({
      title: `¿Quieres actualizar el usuario con estos datos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          this.userForm.get('password').value !==
          this.userForm.get('rpassword').value
        ) {
          this.passwordMatch = true;
          this.roleCorrect = false;
        } else if (
          this.userForm.get('role').value.toLowerCase() === 'admin' ||
          this.userForm.get('role').value.toLowerCase() === 'user'
        ) {
          this.passwordMatch = false;
          this.roleCorrect = false;
          this.userService
            .updateUser(this.user.data.id, this.userForm.value)
            .subscribe(() => {
              Swal.fire(
                `Usuario actualizado correctamente`,
                '',
                'success'
              ).then(() => {
                this.router.navigate(['usuario/listado']);
              });
            });
        } else {
          this.roleCorrect = true;
          this.passwordMatch = false;
        }
      }
    });
  }
}
