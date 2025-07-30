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
    MatButtonModule,
   MatIconModule],
  templateUrl: './dialog-nivel.component.html',
  styleUrl: './dialog-nivel.component.scss'
})
export class DialogNivelComponent {
constructor(public dialog: MatDialog,private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any){}

  nombreNivel: any;
  idNivel: any;
  estadoNivel: any;


  ActualizarOregistrarNivel() {
  const nuevoNivel = {
    tri_niv_id:this.idNivel,
    tri_niv_dificultad: this.nombreNivel,
    tri_niv_estado: this.estadoNivel
  };

  const url = 'https://localhost:7089/api/tributrek/Nivel/';

  if (this.data.modo === 'agregar') {
    if(nuevoNivel.tri_niv_dificultad){
      console.log(nuevoNivel);
      console.log(this.nombreNivel);
      this.http.post(url+'CrearNivel', nuevoNivel).subscribe({
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
       Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error al registrar',
          confirmButtonText: 'Aceptar'
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
    if(nuevoNivel.tri_niv_dificultad){
      this.http.put(`${url}ActualizarNivel/${nuevoNivel.tri_niv_id}`, nuevoNivel).subscribe({
  
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
          title: 'Error!',
          text: 'Error al actualizar',
          confirmButtonText: 'Aceptar'
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
    if (this.data.modo === 'editar' && this.data.nivel) {
      const it = this.data.nivel;
      console.log(this.data.nivel);
      this.nombreNivel = it.nombreNivel;
      this.idNivel= it.idNivel;
      this.estadoNivel = it.estadoNivel;
    }
  }

  limpiarDatos(){
    this.nombreNivel = "";
  }

   cerrarDialog(){
    this.dialog.closeAll();
  
  }



}
