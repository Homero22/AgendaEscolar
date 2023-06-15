import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() form!: string
  @Input() title!: string

  element: {
    form: string,
    title: string
  } = {
    form: '',
    title: ''
  }

  constructor() { }


  ngOnInit(): void {}

  openModal(){
    console.log("Abriendo modal")
    this.element.form = this.form
    this.element.title = this.title

    //servicio Modal para el setForm



    if(this.element.form){
      console.log("Entrnaod al Modal")
      //servicio Modal para openModal()
    }
  }

}
