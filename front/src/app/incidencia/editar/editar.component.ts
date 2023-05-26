import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Document } from '../interfaces/document';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clients } from '../interfaces/clients';
import { catchError, EMPTY } from 'rxjs';
import { LoginService } from 'src/app/login/services/login.service';
import { User } from 'src/app/auth/interfaces/user';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
})
export class EditarComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private loginService: LoginService
  ) {}

  public document: Document;
  public user: User;
  public clients: Clients;

  public client_id: number;

  ngOnInit(): void {
    this.loginService.me().subscribe((user) => {
      this.user = user;
    })
    this.paramMapSubscription();
    this.documentService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  private paramMapSubscription(): void {
    this.route.paramMap.subscribe((params) => {
      this.documentService
        .getDocumentById(+params.get('id'))
        .subscribe((response) => {
          this.document = response;
        });
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

  public editar(): void {
    Swal.fire({
      title: `¿Quieres actualizar el documento con estos datos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService
          .updateDocument(this.document.data.id, this.incidenciaForm.value)
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
            Swal.fire(
              `Documento actualizado correctamente`,
              '',
              'success'
            ).then(() => {
              this.router.navigate(['incidencia/listado']);
            });
          });
      }
    });
  }
}
