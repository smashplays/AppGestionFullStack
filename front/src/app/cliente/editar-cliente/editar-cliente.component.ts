import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/incidencia/services/document.service';
import { Client } from '../../incidencia/interfaces/client';
import { LoginService } from 'src/app/login/services/login.service';
import { User } from 'src/app/auth/interfaces/user';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
})
export class EditarClienteComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private loginService: LoginService
  ) {}

  public client: Client;
  public user: User;

  ngOnInit(): void {
    this.loginService.me().subscribe((user) => {
      this.user = user;
    });
    this.paramMapSubscription();
  }

  private paramMapSubscription(): void {
    this.route.paramMap.subscribe((params) => {
      this.documentService
        .getClientById(+params.get('id'))
        .subscribe((response) => {
          this.client = response;
        });
    });
  }

  public clienteForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    dni: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{8}[A-Z]$/),
    ]),
    address: new FormControl(null, [Validators.required]),
    town: new FormControl(null, [Validators.required]),
    telephone: new FormControl(null, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
      Validators.pattern('^[0-9]*[1-9][0-9]*$'),
    ]),
    email: new FormControl(null),
  });

  public validateForm(): boolean {
    return this.clienteForm.invalid;
  }

  public editar(): void {
    Swal.fire({
      title: `¿Quieres actualizar el cliente con estos datos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService
          .updateClient(this.client.data.id, this.clienteForm.value)
          .subscribe(() => {
            Swal.fire(`Cliente actualizado correctamente`, '', 'success').then(
              () => {
                this.router.navigate(['cliente/listado']);
              }
            );
          });
      }
    });
  }
}
