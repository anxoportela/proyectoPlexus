import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import datosEjemplo from '../../../assets/data.json';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  Datos: any = datosEjemplo;
  icFi = faArrowLeft;
  icFd = faArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

}
