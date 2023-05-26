import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Users } from '../interfaces/users';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { LoginService } from 'src/app/login/services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listado-usuario',
  styleUrls: ['./listado-usuario.component.css'],
  templateUrl: './listado-usuario.component.html',
})
export class ListadoUsuarioComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) {}

  public passwordMatch: boolean;
  public roleCorrect: boolean = false;

  public users: Users;
  public usuario: User;

  ngOnInit(): void {
    this.getUsers();
    this.loginService.me().subscribe((user) => {
      this.usuario = user;
    });
  }

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

  private getUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  public showModal(): void {
    const formModal = document.querySelector('#formModal');
    const closeBtn = document.querySelector('#closeBtn');

    formModal.classList.add('showModal');

    closeBtn.addEventListener('click', () => {
      formModal.classList.remove('showModal');
    });
  }

  public generar(): void {
    const formModal = document.querySelector('#formModal');

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
      this.userService.generateUser(this.userForm.value).subscribe(() => {
        Swal.fire(`Usuario creado correctamente`, '', 'success').then(() => {
          this.getUsers();
          formModal.classList.remove('showModal');
        });
      });
    } else {
      this.roleCorrect = true;
      this.passwordMatch = false;
    }
  }

  public elimina(id: number): void {
    Swal.fire({
      title: `¿Seguro que quieres borrar el usuario ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUsers(id).subscribe(() => {
          this.getUsers();
          Swal.fire(`Usuario ${id} eliminado correctamente`, '', 'success');
        });
      }
    });
  }

  public edita(id: number): void {
    this.router.navigate([`usuario/editar/${id}`]);
  }
}
