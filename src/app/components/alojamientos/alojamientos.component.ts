import { Component, OnInit } from '@angular/core';
import datosEjemplo from '../../../assets/data.json';

@Component({
  selector: 'app-alojamientos',
  templateUrl: './alojamientos.component.html',
  styleUrls: ['./alojamientos.component.css'],
})
export class AlojamientosComponent implements OnInit {
  Datos: any = datosEjemplo;

  constructor() {}

  ngOnInit(): void {}
}
