import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Finisheds } from 'src/app/incidencia/interfaces/finisheds';
import { DocumentService } from 'src/app/incidencia/services/document.service';
import { Clients } from 'src/app/incidencia/interfaces/clients';
import { User } from 'src/app/auth/interfaces/user';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-listado-terminado',
  templateUrl: './listado-terminado.component.html',
})
export class ListadoTerminadoComponent implements OnInit {
  ngOnInit(): void {
    this.getFinished();
    this.getClients();
    this.loginService.me().subscribe((user) => {
      this.user = user;
    })
  }

  constructor(private documentService: DocumentService, private loginService: LoginService) {}

  public name: string;
  public user: User;

  public finisheds: Finisheds;
  public clients: Clients;

  private getFinished(): void {
    this.documentService.getTerminados().subscribe((documents) => {
      this.finisheds = documents;
    });
  }

  private getClients(): void {
    this.documentService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  public finaliza(id: number): void {
    Swal.fire({
      title: `¿Seguro que quieres retomar la incidencia ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Retomar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.getFinishedById(id).subscribe((document) => {
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
          this.documentService.postRetomado(finished).subscribe(() => {
            Swal.fire(
              `Incidencia ${id} retomada correctamente`,
              '',
              'success'
            ).then(() => {
              this.documentService.deleteFinished(id).subscribe(() => {
                this.getFinished();
              });
            });
          });
        });
      }
    });
  }
}
