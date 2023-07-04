import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ImgService } from 'src/app/core/services/img.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  images: any[] = [];
  slideIndex = 0;
  interval: any;

  openFileDialog(){
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/jpeg";
    inputElement.multiple = true;
    inputElement.addEventListener('change', (event: any) => this.uploadImages(event));
    inputElement.click();
  }


  private destroy$ = new Subject<any>();


  constructor(
    private srvimagenes: ImgService
  ) {}

  ngOnInit(): void {
    this.getImages();
  }

  //Metodo para llamar las imagenes del backend
  getImages() {
    console.log('getImages Llamado');
    this.srvimagenes.getImg()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.images = response;
          console.log("Imagenes Cargadas =>",this.images);
          this.startSlider();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('Complete');
        }
      })
  }

  //Metodo para la iniciar la animacion
  startSlider() {
    this.interval = setInterval(() => {
      this.slideIndex++;
      this.slideAnimation();
    }, 2000);
  }

  slideAnimation() {
    const slider = document.querySelector('.slider') as HTMLElement;
    slider.style.transform = `translateX(-${this.slideIndex * 100}%)`;
  }


  //Metodo para enviar la iamgen al backend

  uploadImages(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push({ url: e.target.result });
      };
      reader.readAsDataURL(files[i]);

      const formData = new FormData();
      formData.append('image', files[i]);

      this.srvimagenes.postImg(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            console.log('Complete');
          }
        })
    }
  }

  onDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
