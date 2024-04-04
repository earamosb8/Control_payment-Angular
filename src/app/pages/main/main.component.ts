import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Usuarios } from './interfaces/users.interface';
import { DatePipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import {FormControl,FormsModule,Validators} from "@angular/forms";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})


export class MainComponent {
  nameField = new FormControl({ value: '', disabled: false }, [Validators.required, this.onlyLettersAndSpacesValidator()]);
  identificacionField = new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("[0-9]+")]);
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
  openModal:boolean=false;
  indice: number = 0 ;

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
    this.cargarUsuarios();
  }




  public  guardarUsuario():void{
    if(this.nameField.valid && this.identificacionField.valid && this.celField.valid && this.dateField.valid){
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

  }



    public cargarUsuarios():void{
      if(localStorage.getItem('Usuarios')){
        this.usuarios = [];
        let storedData = localStorage.getItem('Usuarios') || '{}';
        this.usuarios = JSON.parse(storedData);
        this.dataSource = this.usuarios;
        this.cdr.detectChanges();
    }
  }


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
}




