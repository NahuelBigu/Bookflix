import { Component, OnInit } from '@angular/core';
import { PlanesService } from '../../../services/plan/planes.service';
import { Plan } from 'src/app/models/Plan';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  planes:Array<Plan>;
  planesEditar=[false,false]
  planesOriginales: Array<Plan>;
  constructor(private planesServicie: PlanesService) {
    planesServicie.getPlanes().subscribe(el => {this.planes=el as Array<Plan>; 
      this.planesOriginales=this.planes.map(a => {return {_id:a._id,name:a.name,price:a.price,cantProfile:a.cantProfile,value:a.value,active:a.active} as Plan }); 
    });
  }

  ngOnInit(): void {
  }

  estado(plan){
    return this.planesEditar[plan-1];
  }
  editar(plan){
    this.planesEditar[plan-1]=true;
  }
  cancelar(plan){
    this.planes[plan-1].name= this.planesOriginales[plan-1].name;
    this.planes[plan-1].price= this.planesOriginales[plan-1].price;
    this.planes[plan-1].cantProfile= this.planesOriginales[plan-1].cantProfile;
    this.planesEditar[plan-1]=false;
  }
  guardar(plan: Plan){
    var pos = this.planes.indexOf(plan);
    this.planesOriginales[pos].name= this.planes[pos].name;
    this.planesOriginales[pos].price= this.planes[pos].price;
    this.planesOriginales[pos].cantProfile= this.planes[pos].cantProfile;
    this.planesServicie.putPlan(plan).subscribe();
    this.planesEditar[pos]=false;
  }
}
