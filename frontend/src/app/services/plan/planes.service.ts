import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plan } from 'src/app/models/Plan';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
 
  readonly URL_API = 'http://localhost:3000/api/planes';
  constructor(private http: HttpClient ) { }

  getPlanes() {
    return this.http.get(this.URL_API);
  }

  getPlan(plan) {
    return this.http.get(this.URL_API+`/`+plan);
  }

  postPlan(plan: Plan) {
    return this.http.post(this.URL_API, plan);
  }

  putPlan(plan: Plan) {
    return this.http.put(this.URL_API + `/${plan._id}`, plan);
  }

  deletePlan(plan: Plan) {
    plan.active = false;
    return this.http.delete(this.URL_API + `/${plan._id}`);
  }
}
