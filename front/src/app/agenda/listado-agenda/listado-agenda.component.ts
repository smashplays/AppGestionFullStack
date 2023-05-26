import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { User } from 'src/app/auth/interfaces/user';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
import { AgendaService } from '../services/agenda.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '../interfaces/event';

@Component({
  selector: 'app-listado-agenda',
  templateUrl: './listado-agenda.component.html',
  styleUrls: ['./listado-agenda.component.css'],
})
export class ListadoAgendaComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private agendaService: AgendaService
  ) {}

  public user: User;
  public event: Event = {
    data: {
      id: 0,
      name: '',
      start: '',
      end: '',
    },
  };

  ngOnInit(): void {
    this.loginService.me().subscribe((user) => {
      this.user = user;
      this.getEventos();
    });
  }

  public addEventos(): void {
    const formModal = document.querySelector('#formModal');

    Swal.fire({
      title: '¿Seguro que quieres guardar el evento?',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        this.agendaService
          .generateEvent(this.agendaForm.value)
          .subscribe((res) => {
            Swal.fire('Evento guardado correctamente', '', 'success').then(
              () => {
                formModal.classList.remove('showModal');
                this.getEventos();
              }
            );
          });
      }
    });
  }

  public agendaForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    start: new FormControl(null, [Validators.required]),
    end: new FormControl(null, [Validators.required]),
  });

  public agendaForm2: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    start: new FormControl(null, [Validators.required]),
    end: new FormControl(null, [Validators.required]),
  });

  public validateForm(): boolean {
    return this.agendaForm.invalid;
  }

  public validateForm2(): boolean {
    return this.agendaForm2.invalid;
  }

  public getEventos(): void {
    this.agendaService.getEvents().subscribe((Eventos) => {
      this.calendarOptions.events = Eventos.data.map((evento) => {
        return {
          id: evento.id.toString(),
          title: evento.name,
          start: evento.start,
          end: evento.end,
          color: '#8509D3',
        };
      });
    });
  }

  public getEventById(id: number): void {
    this.agendaService.getEventById(id).subscribe((evento) => {
      this.event = evento;
      const formModal2 = document.querySelector('#formModal2');
      const closeBtn2 = document.querySelector('#closeBtn2');

      formModal2.classList.add('showModal2');

      closeBtn2.addEventListener('click', () => {
        formModal2.classList.remove('showModal2');
      });
    });
  }

  public deleteEvent(id: number): void {
    const formModal2 = document.querySelector('#formModal2');

    Swal.fire({
      title: '¿Seguro que quieres eliminar el evento?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        this.agendaService.deleteEvent(id).subscribe((res) => {
          Swal.fire('Evento eliminado correctamente', '', 'success').then(
            () => {
              formModal2.classList.remove('showModal2');
              this.getEventos();
            }
          );
        });
      }
    });
  }

  public updateEvent(id: number): void {
    const formModal2 = document.querySelector('#formModal2');

    Swal.fire({
      title: '¿Seguro que quieres actualizar el evento?',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        this.agendaService
          .updateEvent(id, this.agendaForm2.value)
          .subscribe((res) => {
            Swal.fire('Evento actualizado correctamente', '', 'success').then(
              () => {
                formModal2.classList.remove('showModal2');
                this.getEventos();
              }
            );
          });
      }
    });
  }

  calendarOptions: CalendarOptions = {
    locale: 'es',
    buttonText: {
      today: 'Hoy',
      week: 'Semana',
      day: 'Día',
    },
    eventClick: this.handleDateClick.bind(this),
    customButtons: {
      addEvent: {
        text: 'Añadir evento',
        click: function () {
          const formModal = document.querySelector('#formModal');
          const closeBtn = document.querySelector('#closeBtn');

          formModal.classList.add('showModal');

          closeBtn.addEventListener('click', () => {
            formModal.classList.remove('showModal');
          });
        },
      },
    },
    expandRows: true,
    slotMinTime: '09:30:00',
    slotMaxTime: '20:30:00',
    firstDay: 1,
    weekends: false,
    dayHeaderFormat: { weekday: 'long' },
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false,
    },
    initialView: 'timeGridWeek',
    allDaySlot: false,
    plugins: [timeGridPlugin],
    headerToolbar: {
      left: 'title',
      center: 'addEvent',
      right: 'prev,next,today,timeGridWeek', // user can switch between the two
    },
    nowIndicator: true,
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    navLinks: true,
    events: [],
  };

  public handleDateClick(arg: any): void {
    this.getEventById(arg.event._def.publicId);
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
    {
      label: 'Inc. pendientes',
      icon: 'pending_actions',
      url: '/incidencia/listado',
    },
    { label: 'Inc. terminadas', icon: 'done', url: '/terminado/listado' },
    { label: 'Clientes', icon: 'label', url: '/cliente/listado' },
  ];
}
