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
  selector: 'app-dialog-nivel',
  standalone: true,
  imports: [MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule],
  templateUrl: './dialog-nivel.component.html',
  styleUrl: './dialog-nivel.component.scss'
})
export class DialogNivelComponent {
constructor(public dialog: MatDialog,private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any){}

  nombreNivel: any;
  idNivel: any;
  estadoActividad: any;


  ActualizarOregistrarActividad() {
  const nuevaActividad = {
    tri_acti_id:this.idActividad,
    tri_acti_descripcion: this.nombreActividad,
    tri_acti_estado: this.estadoActividad
  };

  const url = 'https://localhost:7089/api/tributrek/Actividades/';

  if (this.data.modo === 'agregar') {
     this.http.post(url+'CrearActividades', nuevaActividad).subscribe({
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
      console.log(nuevaActividad.tri_acti_id);
      console.log(nuevaActividad);
      console.log(this.data.actividad);

     this.http.put(`${url}ActualizarActividad/${nuevaActividad.tri_acti_id}`, nuevaActividad).subscribe({

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
    if (this.data.modo === 'editar' && this.data.actividad) {
      const it = this.data.actividad;
      console.log("holaaaa")
      console.log( this.data.actividad);
      this.nombreActividad = it.nombreActividad;
      this.idActividad = it.idActividad;
      this.estadoActividad = it.estadoActividad;

    }
  }



}
