import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crearPost.component.html',
  styleUrls: ['./crearPost.component.css']
})
export class CrearPostComponent implements OnInit {
  miForm!:FormGroup;
  
  constructor(private fb: FormBuilder, private authService:AuthService,
    private postService:PostService) {
      this.miForm=this.fb.group({
        title:[''],
        content:[''],
        published:false,
        authorid:['']
      })
     }

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
