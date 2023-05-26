import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DocumentService } from '../../incidencia/services/document.service';
import { Clients } from '../../incidencia/interfaces/clients';
import { User } from 'src/app/auth/interfaces/user';
import { LoginService } from 'src/app/login/services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-listado-cliente',
  styleUrls: ['./listado-cliente.component.css'],
  templateUrl: './listado-cliente.component.html',
})
export class ListadoClienteComponent implements OnInit {
  constructor(
    private router: Router,
    private documentService: DocumentService,
    private loginService: LoginService,
    private clienteService: ClienteService
  ) {}

  public name: string;

  public clients: Clients;
  public user: User;

  ngOnInit(): void {
    this.getClients();
    this.loginService.me().subscribe((user) => {
      this.user = user;
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

  private getClients(): void {
    this.documentService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  public edita(id: number): void {
    this.router.navigate([`cliente/editar/${id}`]);
  }

  public elimina(id: number): void {
    Swal.fire({
      title: `¿Seguro que quieres borrar el cliente ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.deleteClient(id).subscribe(() => {
          this.getClients();
          Swal.fire(`Cliente ${id} eliminado correctamente`, '', 'success');
        });
      }
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

  public generar(): void {
    const formModal = document.querySelector('#formModal');

    Swal.fire({
      title: `¿Quieres generar el cliente con estos datos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Generar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService
          .generateClient(this.clienteForm.value)
          .subscribe(() => {
            Swal.fire(`Cliente generado correctamente`, '', 'success').then(
              () => {
                this.getClients();
                formModal.classList.remove('showModal');
              }
            );
          });
      }
    });
  }
}
