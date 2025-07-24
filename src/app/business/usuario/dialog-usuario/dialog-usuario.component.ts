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
  selector: 'app-dialog-usuario',
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
  templateUrl: './dialog-usuario.component.html',
  styleUrl: './dialog-usuario.component.scss'
})
export class DialogUsuarioComponent {

    constructor (public dialog: MatDialog,private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any){}
   roles: any[] = [];
   nombreUsuario: any;
   idUsuario: any;
   apellidoUsuario: any;
   correoUsuario:any;
   nombreDeUsuario:any;
   rolSeleccionado: any;
   EstadoUsuario: any;

  

   listarRoles() {
    return this.http.get<any[]>(`https://localhost:7089/api/tributrek/Categoria/ListarCategoria`);
  }



  ActualizarOregistrarItinerario() {
  const nuevoUsuario = {
    tri_usu_id: this.idUsuario,
    tri_usu_apellido: this.apellidoUsuario,
    tri_usu_nombres: this.nombreUsuario,
    tri_usu_correo:   this.correoUsuario,
    tri_usu_estado: this.EstadoUsuario,
    tri_usu_nombre_usuario:this.nombreDeUsuario,
    tri_usu_rol_id:this.rolSeleccionado
  };

  const url = 'https://localhost:7089/api/tributrek/Usuario/';
 
  if (this.data.modo === 'agregar') {
     this.http.post(url+'CrearUsuario', nuevoUsuario).subscribe({
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
  
     this.http.put(`${url}ActualizarUsuario/${nuevoUsuario.tri_usu_id}`, nuevoUsuario).subscribe({
     
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

    if (this.data.modo === 'editar' && this.data.itinerario) {
       const it = this.data.itinerario;

      this.nombreUsuario = it.tri_usu_nombres;
      this.idUsuario = it.tri_usu_id;
      this.apellidoUsuario = it.tri_usu_apellido;
      this.correoUsuario = it.tri_usu_correo;
      this.nombreDeUsuario = it.tri_usu_nombre_usuario;
      this.rolSeleccionado = it.tri_usu_rol_id;
      this.EstadoUsuario = it.tri_usu_estado;

    }
    
    this.listarRoles().subscribe({
      next: (data) => {
        console.log(data);
        this.roles = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      }
    });

  }

}
