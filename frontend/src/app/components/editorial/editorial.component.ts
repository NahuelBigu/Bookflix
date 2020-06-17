import { Component, OnInit } from '@angular/core';
import { Editorial } from 'src/app/models/editorial';
import { EditorialService } from '../../services/editorial/editorial.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {
  editorial: Editorial;
  constructor(private ruta: ActivatedRoute,private editorialService: EditorialService) {
    this.ruta.params.subscribe(params => {
      this.editorialService.getEditorial(params['id'])
        .subscribe(data => {
          this.editorial= data as Editorial;
          
        });
    })
   }

  ngOnInit(): void {
  }

}
