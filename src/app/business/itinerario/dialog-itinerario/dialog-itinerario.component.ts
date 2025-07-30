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
  selector: 'app-dialog-itinerario',
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
  templateUrl: './dialog-itinerario.component.html',
  styleUrl: './dialog-itinerario.component.scss',
})

export class DialogItinerarioComponent implements OnInit {
  constructor (public dialog: MatDialog,private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any){}
   categorias: any[] = [];
   nombreItinerario: any;
   categoriaSeleccionada: any;
   nivelSeleccionado: any;
   idItinerario: any;
   EstadoItinerario: any;

   niveles: any[] = [];
  

   listarCategorias() {
    return this.http.get<any[]>(`https://localhost:7089/api/tributrek/Categoria/ListarCategoria`);
  }

   listarNivel() {
    return this.http.get<any[]>(`https://localhost:7089/api/tributrek/Nivel/ListarNivel`);
  }

  ActualizarOregistrarItinerario() {
  const nuevoItinerario = {
    tri_itine_nombre: this.nombreItinerario,
    tri_itine_cat_id: this.categoriaSeleccionada,
    tri_itine_niv_id: this.nivelSeleccionado,
    tri_itine_id:   this.idItinerario,
    tri_itine_estado: this.EstadoItinerario
  };

  const url = 'https://localhost:7089/api/tributrek/Itinerario/';
 
  if (this.data.modo === 'agregar') {
    if(nuevoItinerario.tri_itine_nombre && nuevoItinerario.tri_itine_cat_id && nuevoItinerario.tri_itine_niv_id ){
      this.http.post(url+'CrearItinerario', nuevoItinerario).subscribe({
      next: (res) => {
        this.cerrarDialog();
        this.limpiarDatos();
        Swal.fire({
          icon: 'success',
          title: '¡Agregado!',
          text: 'El registro fue agregado exitosamente.',
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

  } else if (this.data.modo === 'editar') {
  
     this.http.put(`${url}ActualizarItinerario/${nuevoItinerario.tri_itine_id}`, nuevoItinerario).subscribe({
     
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
  }
}

   ngOnInit() {
    console.log('Data recibida en el diálogo:', this.data);

    if (this.data.modo === 'editar' && this.data.itinerario) {
       const it = this.data.itinerario;
       this.nombreItinerario = it.nombreItinerario;
       this.categoriaSeleccionada = it.idCategoria;
       this.nivelSeleccionado = it.idNivel;
       this.idItinerario = it.idItinerario;
       this.EstadoItinerario = it.estadoItinerario;

    }
    
    this.listarCategorias().subscribe({
      next: (data) => {
        console.log(data);
        this.categorias = data;
        console.log("objeto"+this.categorias);
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      }
    });

    this.listarNivel().subscribe({
      next: (data) => {
        console.log(data);
        this.niveles = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      }
    });
  }
   limpiarDatos(){
    this.nombreItinerario = "";
    this.categoriaSeleccionada="";
    this.nivelSeleccionado="";
    this.EstadoItinerario= "";
  }
   cerrarDialog(){
    this.dialog.closeAll();
  }


}
