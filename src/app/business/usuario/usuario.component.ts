import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogUsuarioComponent } from './dialog-usuario/dialog-usuario.component';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';



export interface UserData {
    tri_usu_id: number;
    tri_usu_nombres:string;
    tri_usu_apellido:string;
    tri_usu_correo:string;
    tri_usu_estado: any;
    tri_usu_nombre_usuario: string;
    tri_usu_clave: string;
    tri_usu_rol_id: any;
    tri_rol_nombre:string;
}

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [MatFormFieldModule, 
             MatInputModule,
             MatTableModule,
             MatSortModule,
             MatPaginatorModule,
             HttpClientModule,
             MatIconModule,
            MatButtonModule,
            MatDividerModule,
            MatCardModule,
            CommonModule,
            MatDialogModule,
            FormsModule,
            ReactiveFormsModule,
          LoadingOverlayComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent  implements AfterViewInit {
      cargando:boolean= false;
      mostrarCard: boolean = false;
      displayedColumns: string[] = ['idUsuario', 'nombreUsuario','apellidoUsuario','correoUsuario', 'rolUsuario','estadoUsuario','acciones'];
      dataSource = new MatTableDataSource<UserData>();
    
      constructor(private http: HttpClient,public dialog: MatDialog) {}
    
      @ViewChild(MatPaginator) paginator!: MatPaginator; 
      @ViewChild(MatSort) sort!: MatSort;
    
      ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cargando = true;
        this.cargarUsuario();
      }
    
       cargarUsuario() {
        this.http.get<UserData[]>('https://localhost:7089/api/tributrek/Usuario/ListarUsuario')
          .subscribe(data => {
            console.log(data);
            this.cargando = false;
            this.dataSource.data = data;
          }, error => {
            console.error('Error al cargar itinerarios:', error);
          });
      }
    
      // eliminarItinerario(itinerario:any){
      //   const{idItinerario}=itinerario;
      //   console.log(idItinerario);
      //   this.http.delete(`https://localhost:7089/api/tributrek/Itinerario/EliminarItinerario/${idItinerario}`)
      // .subscribe({
      //   next: () => {
      //     console.log('Itinerario eliminado correctamente');
      //   },
      //   error: (error) => {
      //     console.error('Error al eliminar el itinerario:', error);
      //   }
      // });
    
    
      // }
    
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
      abrirDialogo(modo: 'agregar' | 'editar', usuario?: any): void {
        console.log(usuario);
    
        this.dialog.open(DialogUsuarioComponent, {
             panelClass: 'custom-dialog-container',
           data: {
           modo: modo,
           usuario: usuario || {}
          }
        }).afterClosed().subscribe(result => {
            this.cargarUsuario(); 
      });
        
      } 



}
