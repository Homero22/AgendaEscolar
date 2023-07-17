import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil, Subject } from 'rxjs';
import { AdministradorService } from 'src/app/core/services/administrador.service';
import { UsuarioModel } from 'src/app/core/models/usuario';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { updateUsuarioData } from 'src/app/core/models/usuario';

@Component({
  selector: 'app-buscar-admins',
  templateUrl: './buscar-admins.component.html',
  styleUrls: ['./buscar-admins.component.css']
})
export class BuscarAdminsComponent{

  // displayedColumns: string[] = ['index', 'nombre', 'telefono', 'actions'];
  // dataSource = new MatTableDataSource<UsuarioModel>();

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  // }

  // getUsuarios() {

  // }

  displayedColumns: string[] = ['position', 'name', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>();
  // dataSource = new MatTableDataSource<updateUsuarioData>();
  dataSource! :updateUsuarioData[];
  currentPage: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  length: number = 0;
  pages: number[] = [0,1,2,3,4,5,6,7,8,9,10];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private destroy$ = new Subject<any>();

  // ngAfterViewInit( ) {
  //   this.dataSource.paginator = this.paginator;
  // }

  constructor( public srvUsuario: UsuarioService ){
  //  this.dataSource = this.srvUsuario.ELEMENT_DATA;

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsuarios();
    // this.dataSource = new MatTableDataSource<PeriodicElement>(this.srvUsuario.ELEMENT_DATA);
    // setTimeout(() => {
    // this.dataSource = new MatTableDataSource<updateUsuarioData>(this.srvUsuario.usuarios);
    // }, 2000);
    // console.log("Valor de usuarios en dataSource =>",this.srvUsuario.usuarios);
  }

  getUsuarios() {
    this.srvUsuario.getUsuarios()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(usuarioData)=>{
        console.log("usuarioData =>",usuarioData);
        if(usuarioData.body){
          this.srvUsuario.usuarios = usuarioData.body;
          this.getUsuariosPage(1,5);
          // this.dataSource = new MatTableDataSource<updateUsuarioData>(this.srvUsuario.usuarios);
          // this.dataSource = new MatTableDataSource<PeriodicElement>(this.srvUsuario.ELEMENT_DATA);
          // this.dataSource = this.srvUsuario.usuarios;
          console.log("Valor de usuarios =>",this.srvUsuario.usuarios);

        }else{
          console.log("No hay datos");
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    this.dataSource = this.srvUsuario.usuarios.filter((usuario) => {
      return usuario.nombre.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase());
    });
  }

  //para el paginador
  changePage(event: any) {
    console.log("event =>",event);
    // console.log("event.pageIndex =>",event.pageIndex);
    // console.log("event.pageSize =>",event.pageSize);
    // this.srvUsuario.getUsuarios()
    // .pipe(takeUntil(this.destroy$))
    // .subscribe({
    //   next:(usuarioData)=>{
    //     console.log("usuarioData =>",usuarioData);
    //     this.getUsuariosPage(event,5);
    //     if(usuarioData.body){ 
    //       this.srvUsuario.usuarios = usuarioData.body;
    //       // this.dataSource = new MatTableDataSource<updateUsuarioData>(this.srvUsuario.usuarios);
    //       this.getUsuariosPage(1,5);
    //     }else{
    //       console.log("No hay datos");
    //     }
    //   }
    // });
    this.getUsuariosPage(event,5);
  }

  //dividir los usuarios en paginas
  getUsuariosPage(page: number, size: number) {
    this.srvUsuario.getUsuariosp(page,size)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(usuarioData)=>{
        console.log("usuarioData =>",usuarioData);
        if(usuarioData.body){
          // this.srvUsuario.usuarios = usuarioData.body;
          // this.dataSource = new MatTableDataSource<updateUsuarioData>(this.srvUsuario.usuarios);
          // this.dataSource = new MatTableDataSource<PeriodicElement>(this.srvUsuario.ELEMENT_DATA);
          this.dataSource = usuarioData.body;
          console.log("Valor de usuarios =>",this.srvUsuario.usuarios);

        }else{
          console.log("No hay datos");
        }
      },complete:()=>{
        // this.dataSource.paginator = this.paginator;
      }
    });
  }

  //combertir al usuario en administrador
  convertirAdmin(id: number, user: updateUsuarioData){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Despuès de esto el usuario serà un administrador",
      icon: 'warning',
      showCancelButton: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        user.rol = "ADMINISTRADOR";
        console.log("user =>",user);
        this.srvUsuario.putUser(id, user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(usuarioData)=>{
            console.log("usuarioData =>",usuarioData);
            if(usuarioData.body){
              Swal.fire(
                '¡Hecho!',
                'El usuario ahora es un administrador',
                'success'
              );
              this.getUsuarios();
            }else{
              console.log("No hay datos");
            }
          }
        });
      }
    }
    );
  }
  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
