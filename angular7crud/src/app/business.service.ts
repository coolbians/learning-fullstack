import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  url = 'http://localhost:4000/business';
  response:any;

  constructor(private http: HttpClient) { }

  addBusiness(person_name, business_name, business_gst_number) {
    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
    console.log(obj);
    return this.http.post(this.url + '/add', obj)
        .pipe(map(res => {return res}))
        //.subscribe(res =>console.log('Business successfully added'))
        ;
  }

  getBusinesses(){
    return this.http.get(`${this.url}`);
  }

  editBusiness(id){
    return this.http.get(`${this.url}/edit/${id}`);
  }

  updateBusiness(person_name, business_name, business_gst_number, id){

    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };

    console.log(obj)

    return this.http.post(`${this.url}/update/${id}`, obj)
    // .subscribe(res => console.log(res))
    
  }

  deleteBusiness(id){
    return this.http.get(`${this.url}/delete/${id}`);

  }
  
}