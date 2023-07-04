import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ImgService } from 'src/app/core/services/img.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {


  private destroy$ = new Subject<any>();

  constructor(
    private srvimagenes: ImgService
  ) {}

  ngOnInit(): void {

  }


  //Metodo para enviar la iamgen al backend
  uploadImages(event:any){

  }


  onDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
