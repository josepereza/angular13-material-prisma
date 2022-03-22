import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
usuario:string=''
cerrado:boolean=false
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private authService:AuthService,
    private router:Router
    ) {

      this.authService.cambiousuario.subscribe((data:any)=>{
        this.usuario=data
        if (this.usuario){
          this.cerrado=true
        }
      })
    }
logout(){
  this.cerrado=false
  this.usuario=''
  
  this.router.navigate(['home'])
}

}
