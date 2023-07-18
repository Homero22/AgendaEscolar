import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil, Subject } from 'rxjs';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { updateUsuarioData } from 'src/app/core/models/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  displayedColumns: string[] = ['index', 'nombre', 'correo', 'telefono','fechaCreacion'];
  dataSource = new MatTableDataSource<updateUsuarioData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private destroy$ = new Subject<any>();

  constructor( public srvUsuario: UsuarioService ){}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.srvUsuario.getUsuarios()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(usuarioData)=>{
        console.log("usuarioData =>",usuarioData);
        if(usuarioData.body){
          this.srvUsuario.usuarios = usuarioData.body;
          this.dataSource = new MatTableDataSource<updateUsuarioData>(this.srvUsuario.usuarios);
          this.dataSource.paginator = this.paginator;
        }else{
          console.log("No hay datos");
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
