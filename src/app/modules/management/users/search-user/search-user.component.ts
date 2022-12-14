import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModelUser } from "src/app/models/user.model";
import { SecurityService } from "src/app/services/security.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-search-user",
  templateUrl: "./search-user.component.html",
  styleUrls: ["./search-user.component.css"],
})
export class SearchUserComponent implements OnInit {

  @HostListener('window:beforeunload')
  onUnLoad(){
    const data = new FormData();
    // alert("Desea salir de la aplicacion?")

    data.append('name', 'abc');
    data.append('location', 'world');
    navigator.sendBeacon('http://www.mysitioweb.com/api/v1/endpoint', data);
    // const confirmar = confirm("Desea salir de la aplicacion?");
    // // alert("Desea salir de la aplicacion?")
    console.log("hola Mundo")
    this.serviceSecurity.DeleteDataSession();
    this.router.navigate(['/inicio']);

    return false;

  }

  listUsers: ModelUser[] = [];

  constructor(
    private userService: UserService,
    private serviceSecurity: SecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.IsLogin();
    this.IsAdmin();
    this.GetListUsers();
  }

  GetListUsers() {
    this.userService.GetData().subscribe((data: ModelUser[]) => {
      this.listUsers = data;
    });
  }

  //Este Metodo lo usamos para comprobar que hay un usuario logeado, si no es asi lo enviara a la pagina de inicio
  IsLogin() {
    let data = this.serviceSecurity.GetDataSession();
    if (data === null) {
      this.router.navigate(["/inicio"]);
    }
  }

  // Metodo para comprobar que es el usuario admin
  IsAdmin() {
    let data = this.serviceSecurity.GetDataSession();
    if (data.datos.rol != "administrador") {
      this.router.navigate(["/inicio"]);
    }
  }
}
