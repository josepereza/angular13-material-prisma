import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
usuarios:any;
imagenes:[]=[]
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.listado().subscribe((data:any)=>{
      
      this.usuarios=data
     // this.imagenes=data.image_name.split(',')
      console.log(this.usuarios)
    })
  }
  archivoImagenes(dato:any){
 const arrayImage=dato.split(',')
 return arrayImage
  }

}
