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
import Swal from 'sweetalert2';


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
    MatButtonModule,
    MatIconModule],
  templateUrl: './dialog-paquete.component.html',
  styleUrl: './dialog-paquete.component.scss'
})
export class DialogPaqueteComponent implements OnInit {
   itinerarioSeleccionada: any;
   descripcionPaquete: any[] = [];
   idPaquete: any;
   EstadoItinerario: any;
   itinerarios: any[] = [];
   actividades: any[] = [];
   diasPaquete: number = 0;
   detallesDias: { descripcion: string }[] = [];
   diasArray: number[] = [];
   paquete:any;
    nuevaActividad = {
      descripcion: [] as string[],
      horaInicio: [] as string[],
      horaFin: [] as string[]
    };
   


  constructor (public dialog: MatDialog,private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any){}


   cargarItinerarios() {
    return this.http.get<any[]>('https://localhost:7089/api/tributrek/Itinerario/ListarItinerario');
  }

   cargarActividades() {
    
    return this.http.get<any[]>('https://localhost:7089/api/tributrek/Actividades/ListarActividades');
  }


  ActualizarOregistrarItinerario() {

    console.log(this.paquete);

  const url = 'https://localhost:7089/api/tributrek/Paquete/';

  if (this.data.modo === 'agregar') {
     this.http.post(url+'CrearPaquete', this.paquete).subscribe({
    next: (res) => {
      this.cerrarDialog();
              Swal.fire({
                icon: 'success',
                title: 'Registrado!',
                text: 'El registro fue registrado exitosamente.',
                confirmButtonText: 'Aceptar'
              });
    },
    error: (err) => {
      console.error('Error al registrar', err);
      alert('Error al registrar el itinerario');
    }
  });

  } else if (this.data.modo === 'editar') {

  //    this.http.put(`${url}ActualizarItinerario/${nuevoPaquete.idtri_paq_iti}`, nuevoPaquete).subscribe({

  //   next: (res) => {
  //     console.log('Itinerario actualizado correctamente', res);
  //     alert('¡Registro actualizado!');
  //   },
  //   error: (err) => {
  //     console.error('Error al registrar', err);
  //     alert('Error al registrar actualizar');
  //   }
  // });
  }
}

  agregarDia() {
    const nuevoDia = {
      dianumero: this.paquete.detallesPaq.length + 1,
      idpaquete: 0,
      actividades: []
    };
    this.paquete.detallesPaq.push(nuevoDia);
    this.paquete.cantidadDiasPaquete = this.paquete.detallesPaq.length;
  }

  agregarActividad(actividad:any): void {
  const nuevaActividad = {
    orden:1,
    idActividad: '',
    horaInicio: '',
    horaFin: ''
  };
  
 

  this.paquete.detallesPaq[actividad].actividades.push(nuevaActividad);
}

   ngOnInit() {
    this.paquete = {
      cantidadDiasPaquete: this.diasPaquete,
      descripcionPaquete: this.descripcionPaquete,
      idItinerario: this.itinerarioSeleccionada,
      fechaInicio: '',
      fechaFin: '',
      detallesPaq: [{
        dianumero: 1,
        idpaquete: 0,
        actividades:[]
      }]
    };
    console.log('Data recibida en el diálogo:', this.data);

    if (this.data.modo === 'editar' && this.data.paquete) {
       const it = this.data.paquete;
       this.paquete.descripcionPaquete = it.tri_paq_iti_descripcion;
       this.paquete.diasPaquete = it.tri_paq_iti_canrtidad_dias;
       this.paquete.itinerarioSeleccionada = it.tri_paq_idtri_itine;
       this.paquete.idPaquete = it.idtri_paq_iti;

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
    this.cargarActividades().subscribe({
      next:(data)=>{
        console.log(data);
        this.actividades=data;
      }
    })
  }
  cerrarDialog(){
    this.dialog.closeAll();
  
  }


}

