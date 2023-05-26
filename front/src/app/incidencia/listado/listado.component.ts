import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DocumentService } from '../services/document.service';
import { Documents } from '../interfaces/documents';
import { Clients } from '../interfaces/clients';
import { Finished } from '../interfaces/finished';
import { User } from 'src/app/auth/interfaces/user';
import { LoginService } from 'src/app/login/services/login.service';
import { EMPTY, catchError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listado',
  styleUrls: ['./listado.component.css'],
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {
  constructor(
    private router: Router,
    private documentService: DocumentService,
    private loginService: LoginService
  ) {}

  public user: User;
  public hidden: boolean = true;

  public name: string;

  public finished: Finished;

  public documents: Documents;
  public clients: Clients;

  ngOnInit(): void {
    this.loginService.me().subscribe((user) => {
      this.user = user;
    });
    this.getDocuments();
    this.getClients();
  }

  private getDocuments(): void {
    this.documentService.getDocuments().subscribe((documents) => {
      this.documents = documents;
    });
  }

  private getClients(): void {
    this.documentService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  public finaliza(id: number): void {
    Swal.fire({
      title: `¿Seguro que quieres finalizar la incidencia ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Finalizar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.getDocumentById(id).subscribe((document) => {
          let finished = {
            id: document.data.id,
            type: document.data.type,
            model: document.data.model,
            serial: document.data.serial,
            password: document.data.password,
            charger: document.data.charger,
            pattern: document.data.pattern,
            task: document.data.task,
            client_id: document.data.client_id,
          };
          this.documentService.postTerminado(finished).subscribe(() => {
            Swal.fire(
              `Incidencia ${id} finalizada correctamente`,
              '',
              'success'
            ).then(() => {
              this.documentService.deleteDocument(id).subscribe(() => {
                this.getDocuments();
              });
            });
          });
        });
      }
    });
  }

  public edita(id: number): void {
    this.router.navigate([`incidencia/editar/${id}`]);
  }

  public pdf(id: number): void {
    this.router.navigate([`incidencia/generado/${id}`]);
  }

  public elimina(id: number): void {
    Swal.fire({
      title: `¿Seguro que quieres borrar el documento ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.deleteDocument(id).subscribe(() => {
          this.getDocuments();
          Swal.fire(`Documento ${id} eliminado correctamente`, '', 'success');
        });
      }
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

  public incidenciaForm: FormGroup = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    model: new FormControl(null, [Validators.required]),
    serial: new FormControl(null, [Validators.required]),
    password: new FormControl(null),
    charger: new FormControl(null),
    client_id: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]*[1-9][0-9]*$'),
    ]),
    task: new FormControl(null, [Validators.required]),
  });

  public validateForm(): boolean {
    return this.incidenciaForm.invalid;
  }

  public generar(): void {
    const formModal = document.querySelector('#formModal');

    Swal.fire({
      title: `¿Quieres generar el documento con estos datos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Generar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService
          .generateDocument(this.incidenciaForm.value)
          .pipe(
            catchError((err) => {
              if (err.status === 500) {
                Swal.fire(
                  `El cliente que has introducido no existe`,
                  '',
                  'error'
                );
              }
              return EMPTY;
            })
          )
          .subscribe(() => {
            Swal.fire(`Documento generado correctamente`, '', 'success').then(
              () => {
                this.getDocuments();
                formModal.classList.remove('showModal');
              }
            );
          });
      }
    });
  }
}
