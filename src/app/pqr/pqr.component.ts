import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm, FormBuilder, FormGroup } from "@angular/forms";
import { Pqr } from '../core/models/pqr.model';
import { PqrService } from '../core/services/pqr.service';
import * as moment from "moment";
import Swal from "sweetalert2";

@Component({
  selector: 'app-pqr',
  templateUrl: './pqr.component.html',
  styleUrls: ['./pqr.component.css']
})
export class PqrComponent implements OnInit {
  crearpqrFormGroup!: FormGroup;

  pqrs!: Pqr[];
  nombre:String = "";
  apellido:String = "";
  NoDocumento:String = "";
  correo:String = "";
  noTelefonico:String = "";
  fecha:String = "";
  tipoSolicitud:String = "";
  descripcion:String = "";
  hoy = new Date();
  respuestaPQR= "Pendiente";
  id:String = "";
  infoPorId: Array<any> = [];



  constructor(private _formBuilder: FormBuilder, private pqrService: PqrService) { }

  ngOnInit(): void {
    this.listarPqr();
    this.pqrFormGrup();
  }
  pqrFormGrup() {
    this.crearpqrFormGroup = this._formBuilder.group({
      _id: ["", Validators.required],
      nombre: ["", [Validators.required]],
      apellido: ["", Validators.required],
      NoDocumento: ["", Validators.required],
      correo: ["", [Validators.required, Validators.email]],
      noTelefonico:["", Validators.required],
      tipoSolicitud: ["", Validators.required],
      descripcion: ["", Validators.required],
    });
  }
  async listarPqr() {
    await this.pqrService
      .getPqr()
      .subscribe(
        data => (
          (this.pqrs = data)
        )
      );
  }
  crear = async (): Promise<any> =>{
    const hoy = moment(new Date()).format("DD-MM-YYYY HH:MM");


    const aleatorio = Math.floor(Math.random()*9999999) + 100001;
    const pqrObj = {
      id: aleatorio.toString(),
      nombre: this.nombre,
      apellido : this.apellido,
      noDocumento: this.NoDocumento,
      correo: this.correo,
      noTelefonico: this.noTelefonico,
      fecha: hoy.toString(),
      noRadicado: aleatorio.toString(),
      tipoSolicitud:this.tipoSolicitud,
      descripcion: this.descripcion,
      respuestaPQR : "Pendiente",
      areaRespuestaPQR : "Sin Aginar",
      estadoPQR :  "Pendiente",
    }

    this.pqrService.createPqr(pqrObj).subscribe(data=>
      Swal.fire({
        icon: "success",
        text: "Se creó correctamente.",
        showConfirmButton: true,
        confirmButtonColor: "#623988",
      }).then((result) => {
        if (result.value) {
          window.location.reload();
        }
      }),

        error => {
          Swal.fire({
                icon: "error",
                text: "Error al resgistrar la PQR.",
                showConfirmButton: true,
                confirmButtonColor: "#623988",
              }).then((result) => { });
        })

  }


 buscar(){
   console.log(this.id);
   this.pqrService.buscarPorIdPqr(this.id).subscribe(Pqr=> {
     this.infoPorId.push(Pqr);

    },
      error => {
        console.error(error);
      })

 }


}
