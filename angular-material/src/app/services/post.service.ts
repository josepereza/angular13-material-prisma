import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  getAllPosts(){
    return this.http.get('http://localhost:3000/posts')
  }
  crearPost(post:any){
    return this.http.post('http://localhost:3000/posts/crear',post)
  }
}
