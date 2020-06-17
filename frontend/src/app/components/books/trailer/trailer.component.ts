import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/login/auth.service';
import { TrailerService } from 'src/app/services/books/trailer.service';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {
  admin:boolean;
  trailers: Array<String>=new Array;
  constructor(private _servicioTrailers: TrailerService,public authServices:AuthService) { 
    this.admin=authServices.isAdmin();
  }

  ngOnInit(): void {
    this.getTrailers();
  }
  getTrailers(){
    this._servicioTrailers.getTrailers().subscribe(res => {
      this.trailers= res as Array<String>;
    });
  }

}
