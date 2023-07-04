import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil, Subject } from 'rxjs';
import { AdministradorService } from 'src/app/core/services/administrador.service';
import { UsuarioModel } from 'src/app/core/models/usuario';

@Component({
  selector: 'app-mostrar-admins',
  templateUrl: './mostrar-admins.component.html',
  styleUrls: ['./mostrar-admins.component.css'],
})
export class MostrarAdminsComponent implements AfterViewInit {
  displayedColumns: string[] = ['index', 'nombre', 'telefono', 'actions'];
  dataSource = new MatTableDataSource<UsuarioModel>();
  // tableIndex = 1;
  TypeView: number = 0;
  idAdmin!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private destroy$ = new Subject<any>();

  constructor(public srvAdmins: AdministradorService) {}

  ngOnInit(): void {
    this.getAdministradores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  view(op: number) {
    // Lógica para abrir el modal
    this.TypeView = op;
  }

  regresar(){
    this.getAdministradores();
    this.TypeView = 0;
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  getAdministradores() {
    this.srvAdmins
      .getAdministradores()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.srvAdmins.administradores = value.body;
          console.log("administradores ", this.srvAdmins.administradores);
        },
        complete: () => {
          this.dataSource = new MatTableDataSource<UsuarioModel>(
            this.srvAdmins.administradores
          );
          console.log("administradores this.dataSource ", this.dataSource);
        },
      });
  }

  getRowIndex(index: number): number {
    return index + 1;
  }
}

