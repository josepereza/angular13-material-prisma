import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @ViewChild('drawer') midrawer!:MatSidenav ;
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
  console.log(this.midrawer)
 this.midrawer.close();
  this.usuario=''
  
  this.router.navigate(['home'])
}

}
