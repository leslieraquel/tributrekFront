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
  selector: 'app-dialog-categoria',
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
  templateUrl: './dialog-categoria.component.html',
  styleUrl: './dialog-categoria.component.scss'
})
export class DialogCategoriaComponent {

  constructor(public dialog: MatDialog,private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any){}

  nombreCategoria: any;
  idCategoria: any;
  estadoCategoria: any;

  
  ActualizarOregistrarCategoria() {
  const nuevaCategoria = {
    tri_cat_id:this.idCategoria,
    tri_cat_nombre: this.nombreCategoria,
    tri_cat_estado: this.estadoCategoria
  };

  const url = 'https://localhost:7089/api/tributrek/Categoria/';
  if (this.data.modo === 'agregar') {
    if(nuevaCategoria.tri_cat_nombre){
      this.http.post(url+'CrearCategoria', nuevaCategoria).subscribe({
      next: (res) => {
        Swal.fire({
                icon: 'success',
                title: '¡Agregado!',
                text: 'El registro fue agregado exitosamente.',
                confirmButtonText: 'Aceptar'
              }).then(()=>{
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
    if(nuevaCategoria.tri_cat_nombre){
      console.log(nuevaCategoria);
      this.http.put(`${url}ActualizarCategoria/${nuevaCategoria.tri_cat_id}`, nuevaCategoria).subscribe({
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
    if (this.data.modo === 'editar' && this.data.categoria) {
      console.log("entrando a diaglog init");
      console.log( this.data.categoria);
      const it = this.data.categoria;
      this.nombreCategoria = it.tri_cat_nombre;
      this.idCategoria = it.tri_cat_id;
      this.estadoCategoria = it.tri_cat_estado;
    }
  }

   limpiarDatos(){
    this.nombreCategoria = "";
  
  }

   cerrarDialog(){
    this.dialog.closeAll();
  
  }

}
