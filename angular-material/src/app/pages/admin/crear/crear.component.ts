import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  miForm=this.fb.group({
    title:[''],
    content:[''],
    authorid:['']
  })
  constructor(private fb: FormBuilder, private authService:AuthService,
    private postService:PostService) { }

  ngOnInit(): void {
  }
  
crearPost(){
  
  this.miForm.patchValue({authorid:this.authService.idUsuario})
 
 // formData.append('image',this.imageFile);
  this.postService.crearPost(this.miForm.value).subscribe(data=>{
    console.log(data)
  })
}

}
