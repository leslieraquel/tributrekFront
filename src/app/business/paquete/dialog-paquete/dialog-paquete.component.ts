import { Component,OnInit  } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-paquete',
  standalone: true,
  imports: [MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule],
  templateUrl: './dialog-paquete.component.html',
  styleUrl: './dialog-paquete.component.scss'
})
export class DialogPaqueteComponent implements OnInit {
   descripcionPaquete: any[] = [];
   itinerarioSeleccionada: any;
   idPaquete: any;
   EstadoItinerario: any;

   itinerarios: any[] = [];

   diasPaquete: number = 0;
   detallesDias: { descripcion: string }[] = [];
    diasArray: number[] = [];



  constructor (public dialog: MatDialog,private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any){}

  generarDias() {
    this.diasArray = Array.from({ length: this.diasPaquete }, (_, i) => i + 1);
  }

   cargarItinerarios() {
    return this.http.get<any[]>('https://localhost:7089/api/tributrek/Itinerario/ListarItinerario');
  }


  ActualizarOregistrarItinerario() {
  const nuevoPaquete = {
    idtri_paq_iti: this.idPaquete,
    tri_paq_iti_cantidad_dias: this.diasPaquete,
    tri_paq_iti_descripcion: this.descripcionPaquete,
    tri_paq_idtri_itine:   this.itinerarioSeleccionada
  };

  const url = 'https://localhost:7089/api/tributrek/Itinerario/';

  if (this.data.modo === 'agregar') {
     this.http.post(url+'CrearItinerario', nuevoPaquete).subscribe({
    next: (res) => {
      console.log('Itinerario registrado', res);
      alert('¡Registro exitoso!');
    },
    error: (err) => {
      console.error('Error al registrar', err);
      alert('Error al registrar el itinerario');
    }
  });

  } else if (this.data.modo === 'editar') {

     this.http.put(`${url}ActualizarItinerario/${nuevoPaquete.idtri_paq_iti}`, nuevoPaquete).subscribe({

    next: (res) => {
      console.log('Itinerario actualizado correctamente', res);
      alert('¡Registro actualizado!');
    },
    error: (err) => {
      console.error('Error al registrar', err);
      alert('Error al registrar actualizar');
    }
  });
  }
}

   ngOnInit() {
    console.log('Data recibida en el diálogo:', this.data);

    if (this.data.modo === 'editar' && this.data.paquete) {
       const it = this.data.paquete;
       this.descripcionPaquete = it.tri_paq_iti_descripcion;
       this.diasPaquete = it.tri_paq_iti_cantidad_dias;
       this.itinerarioSeleccionada = it.tri_paq_idtri_itine;
       this.idPaquete = it.idtri_paq_iti;

    }


    this.cargarItinerarios().subscribe({
      next: (data) => {
        console.log(data);
        this.itinerarios = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      }
    });
  }


}
