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
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-actividad',
  standalone: true,
  imports: [MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dialog-actividad.component.html',
  styleUrl: './dialog-actividad.component.scss'
})
export class DialogActividadComponent {
constructor(public dialog: MatDialog,private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogActividadComponent>){}

  nombreActividad: any;
  idActividad: any;
  estadoActividad: any;

  
  ActualizarOregistrarActividad() {
  const nuevaActividad = {
    tri_acti_id:this.idActividad,
    tri_acti_descripcion: this.nombreActividad,
    tri_acti_estado: this.estadoActividad
  };

  const url = 'https://localhost:7089/api/tributrek/Actividades/';

  if (this.data.modo === 'agregar') {
    if(nuevaActividad.tri_acti_descripcion){
      this.http.post(url+'CrearActividades', nuevaActividad).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Agregado!',
          text: 'El registro fue agregado exitosamente.',
          confirmButtonText: 'Aceptar'
        }).then(()=>{
          this.dialogRef.close(true); 
          this.cerrarDialog();
          this.limpiarDatos();
        });
      },
      error: (err) => {
        console.error('Error al registrar', err);
        Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un problema al guardar los datos.',
              });
      }
    });
    }else{
       Swal.fire({
                icon: 'warning',
                title: 'Adevertencia',
                text: 'Llena los campos requeridos',
                confirmButtonText: 'Aceptar'
              });
    }

  } else if (this.data.modo === 'editar') {
    if(nuevaActividad.tri_acti_descripcion){
      this.http.put(`${url}ActualizarActividad/${nuevaActividad.tri_acti_id}`, nuevaActividad).subscribe({
     next: (res) => {
       this.cerrarDialog();
             Swal.fire({
               icon: 'success',
               title: 'Actualizado!',
               text: 'El registro fue actualizado exitosamente.',
               confirmButtonText: 'Aceptar'
             });
 
     },
     error: (err) => {
        Swal.fire({
             icon: 'error',
             title: 'Error',
             text: 'Ocurrió un problema al guardar los datos.',
             });
     }
   });
    }else{
      Swal.fire({
                icon: 'warning',
                title: 'Adevertencia',
                text: 'Llena los campos requeridos',
                confirmButtonText: 'Aceptar'
              });
    }
  }
}
  
  ngOnInit() {
    if (this.data.modo === 'editar' && this.data.actividad) {
      const it = this.data.actividad;
      this.nombreActividad = it.nombreActividad;
      this.idActividad = it.idActividad;
      this.estadoActividad = it.estadoActividad;

    }
  }

    limpiarDatos(){
    this.nombreActividad = "";
  
  }

   cerrarDialog(){
    this.dialog.closeAll();
  
  }





}
