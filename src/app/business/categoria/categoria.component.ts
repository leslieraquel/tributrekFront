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
import { DialogCategoriaComponent } from './dialog-categoria/dialog-categoria.component';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';



export interface UserData {
  idCategoria: number;
  nombreCategoria: string;
  estadoCategoria: string;
}

@Component({
  selector: 'app-categoria',
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
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements AfterViewInit  {
      cargando: boolean = false;
      mostrarCard: boolean = false;
      displayedColumns: string[] = ['idCategoria', 'nombreCategoria','estadoCategoria','acciones'];
      dataSource = new MatTableDataSource<UserData>();
  
    constructor(private http: HttpClient,public dialog: MatDialog) {}
  
    @ViewChild(MatPaginator) paginator!: MatPaginator; 
    @ViewChild(MatSort) sort!: MatSort;
    
      ngAfterViewInit():void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cargarCategorias();
        this.cargando = true;

      }
    
       cargarCategorias() {

        this.http.get<UserData[]>('https://localhost:7089/api/tributrek/Categoria/ListarCategoria')
          .subscribe(data => {
            this.dataSource.data = data;
            this.cargando = false;
          }, error => {
            console.error('Error al cargar actividades:', error);
          });
      }
    
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
  
      abrirDialogo(modo: 'agregar' | 'editar', categoria?: any): void {
        console.log(categoria); 
        this.dialog.open(DialogCategoriaComponent, {
           panelClass: 'custom-dialog-container',
           data: {
           modo: modo,
           categoria: categoria || {}
          }
        }).afterClosed().subscribe(result => {
            this.cargarCategorias(); 
      });
        
      } 


}
