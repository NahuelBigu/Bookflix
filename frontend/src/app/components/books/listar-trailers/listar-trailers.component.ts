import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-trailers',
  templateUrl: './listar-trailers.component.html',
  styleUrls: ['./listar-trailers.component.css']
})
export class ListarTrailersComponent implements OnInit {

  data: any;
  totalRecords: number;
  page: number=1;



  trailers =[{
    title: 'Trailer prueba',
    text:' algo de texto...........................algo de texto...........................algo de texto...........................algo de texto...........................algo de texto...........................',
    createdAt: (new Date)
  },{
    title: 'Trailer prueba',
    text:' algo de texto...........................algo de texto...........................algo de texto...........................algo de texto...........................algo de texto...........................',
    createdAt: (new Date)
  },{
    title: 'Trailer prueba',
    text:' algo de texto...........................algo de texto...........................algo de texto...........................algo de texto...........................algo de texto...........................',
    createdAt: (new Date)
  },{
    title: 'Trailer prueba',
    text:' algo de texto...........................algo de texto...........................algo de texto...........................algo de texto...........................algo de texto...........................',
    createdAt: (new Date)
  }]
  constructor() { this.data = this.trailers}

  ngOnInit(): void {
  }

}
