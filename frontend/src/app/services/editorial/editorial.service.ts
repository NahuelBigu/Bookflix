import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Editorial } from 'src/app/models/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  readonly URL_API= 'http://localhost:3000/api/editoriales';
  
  constructor(private http: HttpClient) { }

  getEditoriales(){
    return this.http.get(this.URL_API);
  }

  postEditorial(editorial: Editorial) {
    return this.http.post(this.URL_API, editorial);
  }

  getEditorial(_id: string){
    return this.http.get(this.URL_API + `/${_id}`);
  }

  putEditorial(editorial: Editorial){
    return this.http.put(this.URL_API + `/${editorial._id}`, editorial);
  }

  deleteEditorial(editorial: Editorial){
    editorial.active=false;
    return this.http.put(this.URL_API + `/${editorial._id}`, editorial);
  }
  addEditorial(editorial: String){
    return this.http.post(this.URL_API,editorial);
  }
}
