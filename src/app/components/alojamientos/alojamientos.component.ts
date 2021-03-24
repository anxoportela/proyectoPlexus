import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alojamientos',
  templateUrl: './alojamientos.component.html',
  styleUrls: ['./alojamientos.component.css'],
})
export class AlojamientosComponent implements OnInit {
  DatoUnico: any = null;
  Datos: any = null;

  constructor(private http: HttpClient) { }

  localUrl = 'http://localhost:8080';

  ngOnInit(): void {

    this.getAlojamientos();

  }

  getAlojamiento() {
    return this.http.get(this.localUrl + "/alojamientos");
  }

  getAlojamientoById(id: number | undefined) {
    if (id != undefined) {
      this.http.get(this.localUrl + "/alojamientos/" + id).subscribe(data => {
        if (data != null && data != undefined) {
          this.DatoUnico = data;
          console.log(this.DatoUnico)
        }
      });
    }
  }

  getAlojamientos() {
    this.getAlojamiento()
      .subscribe(data => {
        if (data != null && data != undefined) {
          this.Datos = data;
        }
      });
  }

}
