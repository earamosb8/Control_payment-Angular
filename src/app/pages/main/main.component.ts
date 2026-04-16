import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Usuarios } from './interfaces/users.interface';
import { DatePipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import {FormControl,FormsModule,Validators} from "@angular/forms";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  nameField = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    this.onlyLettersAndSpacesValidator(),
  ]);
  identificacionField = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    Validators.pattern('[0-9]+'),
  ]);
  identificacionSearch = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    Validators.pattern('[0-9]+'),
  ]);
  celField = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    Validators.pattern('[0-9]+'),
  ]);
  dateField = new FormControl('', Validators.required);
  nameFieldEdit = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    this.onlyLettersAndSpacesValidator(),
  ]);
  identificacionFieldEdit = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    Validators.pattern('[0-9]+'),
  ]);
  celFieldEdit = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    Validators.pattern('[0-9]+'),
  ]);
  dateFieldEdit = new FormControl('', Validators.required);
  nombre: string = '';
  identificacion: string = '';
  celular: string = '';
  fecha = new Date();
  usuarios: Usuarios[] = [];
  usuariosFiltrados: Usuarios[] = [];
  openModal: boolean = false;
  indice: number = 0;
  fechaActual: Date = new Date();

  displayedColumns: string[] = [
    'Nombres',
    'Nro.identificación',
    'Celular',
    'Fecha',
    'Opciones',
  ];
  dataSource = this.usuarios;

  constructor(
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.fechaActual = new Date();
    this.cargarUsuarios();
  }

  /**
   * Guarda un nuevo usuario en localStorage y actualiza la lista.
   * Valida que todos los campos sean válidos y que el usuario no exista
   * previamente según su número de identificación.
   */

  public guardarUsuario(): void {
    if (
      this.nameField.valid &&
      this.identificacionField.valid &&
      this.celField.valid &&
      this.dateField.valid
    ) {
      let existe = this.usuarios.find(
        (usuario) => usuario.identificacion === this.identificacionField.value,
      );
      if (existe === undefined) {
        let usuario: Usuarios = {
          nombre: this.nameField.value,
          identificacion: this.identificacionField.value,
          celular: this.celField.value,
          fecha: this.dateField.value,
        };
        if (localStorage.getItem('Usuarios')) {
          let storedData = localStorage.getItem('Usuarios') || '{}';
          this.usuarios = JSON.parse(storedData);
          this.usuarios.push(usuario);
          localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
        } else {
          this.usuarios.push(usuario);
          localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
        }
        this.cargarUsuarios();
        this.limpiarCampos();
      } else {
        Swal.fire({
          text:
            'El usuario con numero de identificación ' +
            this.identificacionField.value +
            ' ya existe',
          showConfirmButton: true,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#F44336',
        });
      }
    }
  }

  /**
   * Carga la lista de usuarios almacenada en localStorage.
   * Parsea las fechas usando el reviver para restaurarlas como objetos Date.
   * Actualiza el dataSource de la tabla y fuerza la detección de cambios.
   */

  public cargarUsuarios(): void {
    if (localStorage.getItem('Usuarios')) {
      this.usuarios = [];
      let storedData = localStorage.getItem('Usuarios') || '{}';
      this.usuarios = JSON.parse(storedData, this.reviver);
      this.dataSource = this.usuarios;
      this.cdr.detectChanges();
    }
  }

  /**
   * Función reviver para JSON.parse.
   * Convierte el campo 'fecha' de string ISO a un objeto Date al deserializar.
   */

  public reviver = (key: any, value: any) => {
    if (key === 'fecha') {
      return new Date(value);
    }
    return value;
  };

  /**
   * Elimina un usuario de la lista y actualiza localStorage.
   * Tras eliminar, vuelve a parsear los datos para mantener
   * las fechas como objetos Date en el arreglo local.
   */

  public eliminarUsuario(user: any): void {
    let indice = this.usuarios.indexOf(user);
    this.usuarios.splice(indice, 1);
    localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));

    let storedData = localStorage.getItem('Usuarios') || '[]';
    this.usuarios = JSON.parse(storedData).map((u: any) => ({
      ...u,
      fecha: new Date(u.fecha),
    }));

    this.dataSource = this.usuarios;
  }

  /**
   * Abre el modal de edición y carga los datos del usuario
   * seleccionado en los campos del formulario de edición.
   */

  public editarUsuario(user: any): void {
    this.openModal = true;
    this.indice = this.usuarios.indexOf(user);
    this.nameFieldEdit.setValue(this.usuarios[this.indice].nombre);
    this.identificacionFieldEdit.setValue(
      this.usuarios[this.indice].identificacion,
    );
    this.celFieldEdit.setValue(this.usuarios[this.indice].celular);
    this.dateFieldEdit.setValue(this.usuarios[this.indice].fecha);
  }

  /**
   * Guarda los cambios del usuario editado si todos los campos del
   * formulario de edición son válidos. Actualiza localStorage y cierra el modal.
   */

  public editarUsuarioSeleccionado() {
    if (
      this.nameFieldEdit.valid &&
      this.identificacionFieldEdit.valid &&
      this.celFieldEdit.valid &&
      this.dateFieldEdit.valid
    ) {
      this.usuarios[this.indice].nombre = this.nameFieldEdit.value;
      this.usuarios[this.indice].identificacion =
        this.identificacionFieldEdit.value;
      this.usuarios[this.indice].celular = this.celFieldEdit.value;
      this.usuarios[this.indice].fecha = this.dateFieldEdit.value;
      localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
      this.openModal = false;
    }
  }

  /**
   * Validador personalizado que rechaza valores con caracteres
   * distintos a letras y espacios (sin números ni símbolos).
   */

  onlyLettersAndSpacesValidator() {
    return (control: any) => {
      if (control.value && !/^[A-Za-z\s]+$/.test(control.value)) {
        return { invalidCharacters: true };
      }
      return null;
    };
  }

  /**
   * Filtra la lista de usuarios en base al valor ingresado en el campo de búsqueda.
   * Busca coincidencias desde el inicio del número de identificación.
   * Si el campo está vacío, restaura la lista completa.
   */
  public buscarUsuario(): void {
    const busqueda = this.identificacionSearch.value?.toString().trim() ?? '';
    if (busqueda === '') {
      this.dataSource = this.usuarios;
      return;
    }
    this.usuariosFiltrados = this.usuarios.filter((usuario) =>
      usuario.identificacion?.toString().startsWith(busqueda),
    );
    this.dataSource = this.usuariosFiltrados;
  }

  /**
   * Verifica si ya existe un usuario registrado con la identificación
   * actualmente ingresada en el campo identificacionField.
   * (Pendiente: manejar el resultado de la validación.)
   */
  public validarIdExiste(): void {
    let existe = this.usuarios.find(
      (usuario) => usuario.identificacion === this.identificacionField.value,
    );
  }

  /**
   * Resetea los campos del formulario de registro a su estado inicial,
   * limpiando valores y marcándolos como pristine y untouched.
   */

  private limpiarCampos(): void {
    this.nameField.reset();
    this.identificacionField.reset();
    this.celField.reset();
    this.dateField.reset();
  }
}




