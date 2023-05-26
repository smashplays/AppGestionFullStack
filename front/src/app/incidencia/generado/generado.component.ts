import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Document } from '../interfaces/document';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { Client } from '../interfaces/client';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-generado',
  templateUrl: './generado.component.html',
})
export class GeneradoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService
  ) {}

  public document: Document;
  public client: Client;

  ngOnInit(): void {
    this.paramMapSubscription();
  }

  private paramMapSubscription(): void {
    this.route.paramMap.subscribe((params) => {
      this.documentService
        .getDocumentById(+params.get('id'))
        .subscribe((response) => {
          this.document = response;
          this.documentService
            .clientDocument(this.document.data.id)
            .subscribe((clientDocument) => {
              this.client = clientDocument;
              this.pdf();
            });
        });
    });
  }

  private async pdf(): Promise<void> {
    //TODO: Meter mierdas del PDF
    let pdf = new jsPDF();

    pdf.setFontSize(12);

    var img = new Image();
    img.src = '../../../assets/img/logo.png';
    pdf.addImage(img, 'png', 11, 8, 25, 20);

    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'bold')
      .text('TIENDA INVENTADA', 40, 8);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'bold')
      .text('COPIA CLIENTE', 90, 8);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('CALLE INVENTADA 66', 40, 12);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('03160 ALMORADI', 40, 16);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('666666666', 40, 20);

    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('Email: info@tiendainventada.com', 40, 24);

    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'bold')
      .text(this.client.data.name, 133, 8);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(this.client.data.address, 133, 12);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(this.client.data.town, 133, 16);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(this.client.data.email ? this.client.data.email : '', 133, 20);

    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('TLF: ' + this.client.data.telephone, 178, 20);

    pdf.setLineWidth(0.25);
    pdf.rect(132, 4, 70, 18);

    pdf.rect(11, 33, 42, 5);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(`Nº Parte:      ` + this.document.data.id, 16, 37);

    let date = formatDate(this.document.data.created_at, 'dd-MM-YYYY', 'en');

    pdf.rect(53, 33, 45, 5);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(`Fecha      ` + date, 58, 37);

    pdf.rect(98, 33, 62, 5);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('Técnico   Jesus Terres', 102, 37);

    pdf.rect(160, 33, 42, 5);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(`Cliente     0` + this.client.data.id, 168, 37);

    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('TRABAJO A REALIZAR + PRESUPUESTO', 11, 43);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'bold')
      .text(this.document.data.task, 12, 48);

    pdf.rect(11, 44, 87, 20);
    pdf.rect(98, 38, 104, 26);
    pdf.setFont('Roboto-Regular', 'bold').text('Tipo de dispositivo: ', 99, 42);
    pdf
      .setFont('Roboto-Regular', 'regular')
      .text(this.document.data.type, 127, 42);
    pdf.setFont('Roboto-Regular', 'bold').text('Modelo: ', 99, 46);
    pdf
      .setFont('Roboto-Regular', 'regular')
      .text(this.document.data.model, 111, 46);
    pdf.setFont('Roboto-Regular', 'bold').text('Número de serie: ', 99, 50);
    pdf
      .setFont('Roboto-Regular', 'regular')
      .text(this.document.data.serial, 123, 50);

    pdf.setFont('Roboto-Regular', 'bold').text('Contraseña/Patrón: ', 99, 54);
    pdf
      .setFont('Roboto-Regular', 'regular')
      .text(
        this.document.data.password ? this.document.data.password : 'No tiene',
        127,
        54
      );

    pdf.setFont('Roboto-Regular', 'bold').text('Accesorios: ', 99, 58);
    pdf
      .setFont('Roboto-Regular', 'regular')
      .text(
        this.document.data.charger ? this.document.data.charger : 'No tiene',
        115,
        58
      );

    pdf.rect(162, 73, 40, 10);
    pdf
      .setFontSize(10)
      .setFont('Roboto-Regular', 'regular')
      .text('Firma Cliente', 169, 71);

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Estimado cliente, tenga en cuenta lo descrito a continuación para que pueda recibir el servicio técnico que le brindamos, sin ningún contratiempo:',
        11,
        85
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum volutpat justo, vel rhoncus augue pellentesque ac. Quisque sodales turpis.',
        11,
        88
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis augue viverra, auctor libero eget, hendrerit nibh. Proin ut dictum leo. Praesent vestibulum eleifend massa vitae sit,',
        11,
        91
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'In sodales turpis eget sem placerat, eget suscipit nibh lobortis. Maecenas ultrices tristique aliquet. Integer cursus ex.',
        11,
        94
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '3. Nam vitae diam aliquam augue sollicitudin tristique eget non neque. Ut luctus mauris eu odio imperdiet, in dignissim quam malesuada. Donec elementum sem ut mollis tristique. Donec morbi',
        11,
        97
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Nunc molestie enim dui, in tempus quam blandit at. Duis ac ex sodales, pellentesque metus a massa nunc.',
        11,
        100
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '4. Suspendisse efficitur libero quis pulvinar posuere. Phasellus tellus massa, euismod eu tristique ut, feugiat ut risus. Integer scelerisque mi ac est erat curae.',
        11,
        103
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '5. Morbi gravida metus ante. Pellentesque non luctus leo. Nullam mattis, metus rhoncus iaculis eleifend, orci lorem non.',
        11,
        106
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '6. Donec molestie nec nunc sit amet dapibus. Nunc blandit, risus scelerisque cursus feugiat, risus enim scelerisque mi, in maximus magna turpis eu nisl. Ut sollicitudin neque nec velit laoreet augue',
        11,
        109
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Mauris vitae purus et leo fermentum lacinia non at eros. Sed tempus lacus et ipsum malesuada ullamcorper accumsan.',
        11,
        112
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '7. Phasellus malesuada lobortis ante non lacinia. Integer ornare tristique euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porttitor lorem sed elit tellus.',
        11,
        115
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '8. Pellentesque finibus convallis odio, at auctor eros. Curabitur a pulvinar tortor. Suspendisse vel mauris a ex faucibus luctus eget sit amet neque. Etiam id justo nec lorem fringilla malesuada justo',
        11,
        118
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Maecenas neque purus, ullamcorper ac metus porttitor, sodales mattis mauris. Sed consequat sagittis semper. Ut ac magna suscipit blandit',
        11,
        121
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '9. Nam iaculis ultricies diam, at laoreet justo euismod dictum. Vestibulum ut suscipit tellus. Vestibulum imperdiet ultrices erat ac feugiat. Orci varius natoque penatibus et magnis dis leo',
        11,
        124
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text('Nulla morbi.', 11, 127);

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent scelerisque, erat non mollis vestibulum, nisl enim consectetur tortor, sit amet euismod velit ex eu est. Curabitur orci aliquam',
        11,
        131
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut erat ipsum. Donec lobortis, quam at volutpat varius, eros sapien lacinia diam, ut placerat neque lorem id augue mauris ',
        11,
        134
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Proin faucibus tempus lacus, sed lacinia nibh dapibus vitae. Aenean dignissim ullamcorper libero, eget volutpat dolor venenatis a. Vestibulum ante ipsum primis ut.',
        11,
        137
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Cras vel cursus magna. Donec malesuada pulvinar augue at posuere. Nunc commodo mi vel faucibus viverra. Morbi dictum, nulla sit amet mollis aliquam, dolor tellus volutpat lacus, ac sollicitudin morbi',
        11,
        140
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Etiam vestibulum quam eu accumsan tincidunt. Aliquam ultricies hendrerit pulvinar. Integer pretium, nisl non venenatis porttitor est',
        11,
        143
      );

    pdf.addImage(img, 'png', 11, 152, 25, 20);

    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'bold')
      .text(
        '-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
        11,
        147
      );

    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'bold')
      .text('TIENDA INVENTADA', 40, 155);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'bold')
      .text('COPIA TALLER', 90, 155);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('CALLE INVENTADA 66', 40, 159);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('03160 ALMORADI', 40, 163);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('666666666', 40, 167);

    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('Email: info@tiendainventada.com', 40, 171);

    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'bold')
      .text(this.client.data.name, 133, 155);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(this.client.data.address, 133, 159);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(this.client.data.town, 133, 163);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(this.client.data.email ? this.client.data.email : '', 133, 167);

    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('TLF: ' + this.client.data.telephone, 178, 167);

    pdf.setLineWidth(0.25);
    pdf.rect(132, 151, 70, 18);

    pdf.rect(11, 174, 42, 5);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(`Nº Parte:      ` + this.document.data.id, 16, 178);

    pdf.rect(53, 174, 45, 5);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(`Fecha      ` + date, 58, 178);

    pdf.rect(98, 174, 62, 5);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('Técnico   Jesus Terres', 102, 178);

    pdf.rect(160, 174, 42, 5);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text(`Cliente     0` + this.client.data.id, 168, 178);

    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'regular')
      .text('TRABAJO A REALIZAR + PRESUPUESTO', 11, 184);
    pdf
      .setFontSize(9)
      .setFont('Roboto-Regular', 'bold')
      .text(this.document.data.task, 12, 189);

    pdf.rect(11, 185, 87, 20);
    pdf.rect(98, 179, 104, 26);
    pdf
      .setFont('Roboto-Regular', 'bold')
      .text('Tipo de dispositivo: ', 99, 183);
    pdf
      .setFont('Roboto-Regular', 'regular')
      .text(this.document.data.type, 127, 183);
    pdf.setFont('Roboto-Regular', 'bold').text('Modelo: ', 99, 187);
    pdf
      .setFont('Roboto-Regular', 'regular')
      .text(this.document.data.model, 111, 187);
    pdf.setFont('Roboto-Regular', 'bold').text('Número de serie: ', 99, 191);
    pdf
      .setFont('Roboto-Regular', 'regular')
      .text(this.document.data.serial, 123, 191);

    pdf.setFont('Roboto-Regular', 'bold').text('Contraseña/Patrón: ', 99, 195);
    pdf
      .setFont('Roboto-Regular', 'regular')
      .text(
        this.document.data.password ? this.document.data.password : 'No tiene',
        127,
        195
      );

    pdf.setFont('Roboto-Regular', 'bold').text('Accesorios: ', 99, 199);
    pdf
      .setFont('Roboto-Regular', 'regular')
      .text(
        this.document.data.charger ? this.document.data.charger : 'No tiene',
        115,
        199
      );

    pdf.rect(162, 212, 40, 10);
    pdf
      .setFontSize(10)
      .setFont('Roboto-Regular', 'regular')
      .text('Firma Cliente', 169, 210);

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Estimado cliente, tenga en cuenta lo descrito a continuación para que pueda recibir el servicio técnico que le brindamos, sin ningún contratiempo:',
        11,
        224
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum volutpat justo, vel rhoncus augue pellentesque ac. Quisque sodales turpis.',
        11,
        227
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis augue viverra, auctor libero eget, hendrerit nibh. Proin ut dictum leo. Praesent vestibulum eleifend massa vitae sit,',
        11,
        230
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'In sodales turpis eget sem placerat, eget suscipit nibh lobortis. Maecenas ultrices tristique aliquet. Integer cursus ex.',
        11,
        233
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '3. Nam vitae diam aliquam augue sollicitudin tristique eget non neque. Ut luctus mauris eu odio imperdiet, in dignissim quam malesuada. Donec elementum sem ut mollis tristique. Donec morbi',
        11,
        236
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Nunc molestie enim dui, in tempus quam blandit at. Duis ac ex sodales, pellentesque metus a massa nunc.',
        11,
        239
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '4. Suspendisse efficitur libero quis pulvinar posuere. Phasellus tellus massa, euismod eu tristique ut, feugiat ut risus. Integer scelerisque mi ac est erat curae',
        11,
        242
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '5. Morbi gravida metus ante. Pellentesque non luctus leo. Nullam mattis, metus rhoncus iaculis eleifend, orci lorem non.',
        11,
        245
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '6. Donec molestie nec nunc sit amet dapibus. Nunc blandit, risus scelerisque cursus feugiat, risus enim scelerisque mi, in maximus magna turpis eu nisl. Ut sollicitudin neque nec velit laoreet augue',
        11,
        248
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Mauris vitae purus et leo fermentum lacinia non at eros. Sed tempus lacus et ipsum malesuada ullamcorper accumsan.',
        11,
        251
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '7. Phasellus malesuada lobortis ante non lacinia. Integer ornare tristique euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porttitor lorem sed elit tellus.',
        11,
        254
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '8. Pellentesque finibus convallis odio, at auctor eros. Curabitur a pulvinar tortor. Suspendisse vel mauris a ex faucibus luctus eget sit amet neque. Etiam id justo nec lorem fringilla malesuada justo',
        11,
        257
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Maecenas neque purus, ullamcorper ac metus porttitor, sodales mattis mauris. Sed consequat sagittis semper. Ut ac magna suscipit blandit',
        11,
        260
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        '9. Nam iaculis ultricies diam, at laoreet justo euismod dictum. Vestibulum ut suscipit tellus. Vestibulum imperdiet ultrices erat ac feugiat. Orci varius natoque penatibus et magnis dis leo',
        11,
        263
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text('Nulla morbi.', 11, 266);

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent scelerisque, erat non mollis vestibulum, nisl enim consectetur tortor, sit amet euismod velit ex eu est. Curabitur orci aliquam',
        11,
        272
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut erat ipsum. Donec lobortis, quam at volutpat varius, eros sapien lacinia diam, ut placerat neque lorem id augue mauris ',
        11,
        275
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Proin faucibus tempus lacus, sed lacinia nibh dapibus vitae. Aenean dignissim ullamcorper libero, eget volutpat dolor venenatis a. Vestibulum ante ipsum primis ut.',
        11,
        278
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Cras vel cursus magna. Donec malesuada pulvinar augue at posuere. Nunc commodo mi vel faucibus viverra. Morbi dictum, nulla sit amet mollis aliquam, dolor tellus volutpat lacus, ac sollicitudin morbi',
        11,
        282
      );

    pdf
      .setFontSize(7)
      .setFont('Roboto-Regular', 'regular')
      .text(
        'Etiam vestibulum quam eu accumsan tincidunt. Aliquam ultricies hendrerit pulvinar. Integer pretium, nisl non venenatis porttitor est',
        11,
        285
      );

    pdf.output('dataurlnewwindow');
    this.router.navigate(['incidencia/listado']);
  }
}
