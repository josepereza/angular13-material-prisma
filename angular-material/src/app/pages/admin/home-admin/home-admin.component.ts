import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  panelOpenState = false;

usuario:string=''
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
this.usuario=this.authService.usuario

  }

}
