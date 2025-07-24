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
    MatButtonModule],
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
     this.http.post(url+'CrearCategoria', nuevaCategoria).subscribe({
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
     this.http.put(`${url}ActualizarCategoria/${nuevaCategoria.tri_cat_id}`, nuevaCategoria).subscribe({
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
    if (this.data.modo === 'editar' && this.data.categoria) {
      console.log("entrando a diaglog init");
      console.log( this.data.categoria);
      const it = this.data.categoria;
      this.nombreCategoria = it.tri_cat_nombre;
      this.idCategoria = it.tri_id_cat;
      this.estadoCategoria = 1;
    }
  }

}
