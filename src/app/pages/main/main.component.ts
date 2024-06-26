import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Usuarios } from './interfaces/users.interface';
import { DatePipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import {FormControl,FormsModule,Validators} from "@angular/forms";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})


export class MainComponent {
  nameField = new FormControl({ value: '', disabled: false }, [Validators.required, this.onlyLettersAndSpacesValidator()]);
  identificacionField = new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("[0-9]+")]);
  identificacionSearch = new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("[0-9]+")]);
  celField = new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("[0-9]+")]);
  dateField = new FormControl('',Validators.required);
  nameFieldEdit = new FormControl({ value: '', disabled: false }, [Validators.required, this.onlyLettersAndSpacesValidator()]);
  identificacionFieldEdit = new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("[0-9]+")]);
  celFieldEdit = new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("[0-9]+")]);
  dateFieldEdit = new FormControl('',Validators.required);
  nombre:string='';
  identificacion:string='';
  celular:string='';
  fecha = new Date();
  usuarios:Usuarios[] =[] ;
  usuariosFiltrados:Usuarios[] =[] ;
  openModal:boolean=false;
  indice: number = 0 ;
  fechaActual: Date = new Date();

  displayedColumns: string[] = ['Nombres', 'Nro.identificación', 'Celular', 'Fecha','Opciones'];
  dataSource = this.usuarios;

/*
  formDatosBasicos = new FormGroup({

    identificacionField: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("[0-9]+")]),
    telefonoField: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("[0-9]+")]),
    nombreField: new FormControl('', Validators.required)
  });
*/
constructor(private datePipe: DatePipe,private cdr: ChangeDetectorRef){

}

  ngOnInit(){
    this.fechaActual = new Date();
    console.log(this.fechaActual);
    this.cargarUsuarios();
  }




  public  guardarUsuario():void{
    if(this.nameField.valid && this.identificacionField.valid && this.celField.valid && this.dateField.valid){
      let existe = this.usuarios.find(usuario => usuario.identificacion === this.identificacionField.value);
      if(existe === undefined){
        let usuario:Usuarios = {
          nombre:this.nameField.value,
          identificacion : this.identificacionField.value,
          celular : this.celField.value ,
          fecha: this.dateField.value
        };
        if(localStorage.getItem('Usuarios')){
          let storedData = localStorage.getItem('Usuarios') || '{}';
          this.usuarios = JSON.parse(storedData);
          this.usuarios.push(usuario);
          localStorage.setItem('Usuarios', JSON.stringify(this.usuarios))


          //this.usuarios = JSON.parse(localStorage.getItem('Usuarios'));
           /*
            this.usuario.push(usuario);
            localStorage.setItem('Usuarios', JSON.stringify(this.usuarios))*/
        }
        else {
          this.usuarios.push(usuario);
          localStorage.setItem('Usuarios', JSON.stringify(this.usuarios))
        }
        this.cargarUsuarios();

      }
      else{
        console.log('usuario Existe');
        Swal.fire(
          {
            text:"El usuario con numero de identificación " + this.identificacionField.value + " ya existe",
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#F44336"
          }
        )
      }

/*
 Swal.fire({
      title: "Confirmar",
      icon: "question",
      text: "¿Esta seguro de eliminar el elemento seleccionado?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      showConfirmButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#F44336"
    }

*/

    }

  }



    public cargarUsuarios():void{
      if(localStorage.getItem('Usuarios')){
        this.usuarios = [];
        let storedData = localStorage.getItem('Usuarios') || '{}';
        this.usuarios = JSON.parse(storedData,this.reviver);
        this.dataSource = this.usuarios;
        this.cdr.detectChanges();
    }
  }


  public reviver = (key:any, value:any) => {
    if (key === 'fecha') {
      return new Date(value);
    }
    return value;
  };


  public eliminarUsuario(user:any):void{
    let indice = this.usuarios.indexOf(user);
    this.usuarios.splice(indice,1);
    localStorage.setItem('Usuarios', JSON.stringify(this.usuarios))
    this.usuarios = [];
    let storedData = localStorage.getItem('Usuarios') || '{}';
    this.usuarios = JSON.parse(storedData);
    this.dataSource = this.usuarios;
  }

    public editarUsuario(user:any):void{
      this.openModal = true;
      this.indice = this.usuarios.indexOf(user);
      console.log(this.usuarios[this.indice].nombre);
      this.nameFieldEdit.setValue(this.usuarios[this.indice].nombre);
      this.identificacionFieldEdit.setValue(this.usuarios[this.indice].identificacion);
      this.celFieldEdit.setValue(this.usuarios[this.indice].celular);
      this.dateFieldEdit.setValue(this.usuarios[this.indice].fecha);
    }

    public editarUsuarioSeleccionado(){
      if(this.nameFieldEdit.valid && this.identificacionFieldEdit.valid && this.celFieldEdit.valid && this.dateFieldEdit.valid){
        this.usuarios[this.indice].nombre = this.nameFieldEdit.value;
        this.usuarios[this.indice].identificacion = this.identificacionFieldEdit.value;
        this.usuarios[this.indice].celular = this.celFieldEdit.value;
        this.usuarios[this.indice].fecha = this.dateFieldEdit.value;
        localStorage.setItem('Usuarios', JSON.stringify(this.usuarios))
        this.openModal= false;
      }
    }

    onlyLettersAndSpacesValidator() {
      return (control:any) => {
        if (control.value && !/^[A-Za-z\s]+$/.test(control.value)) {
          return { 'invalidCharacters': true };
        }
        return null;
      };
    }

    public buscarUsuario():void{
      console.log(this.identificacionSearch.value);
      this.usuariosFiltrados = this.usuarios.filter(usuario => usuario.identificacion === this.identificacionSearch.value);
      console.log(this.usuariosFiltrados);
      if(this.usuariosFiltrados.length > 0){
        this.dataSource = this.usuariosFiltrados;
      } else {
        this.dataSource = this.usuarios;
      }
    }

    public validarIdExiste():void{
      let existe = this.usuarios.find(usuario => usuario.identificacion === this.identificacionField.value);
      console.log(existe);
    }
}




