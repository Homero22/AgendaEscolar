import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil, Subject } from 'rxjs';
import { MateriaService } from 'src/app/core/services/materia.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent {

  displayedColumns: string[] = ['index', 'nombre', 'acronimo', 'color'];
  dataSource = new MatTableDataSource<any>();

  private destroy$ = new Subject<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( public srvMateria: MateriaService ){}

  ngOnInit(): void {
    this.getMaterias();
  }

  getMaterias() {
    this.srvMateria.getMaterias()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(materiaData)=>{
        console.log("materiaData =>",materiaData);
        if(materiaData.body){
          this.srvMateria.datosMateria = materiaData.body;
          this.dataSource = new MatTableDataSource<any>(this.srvMateria.datosMateria);
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
