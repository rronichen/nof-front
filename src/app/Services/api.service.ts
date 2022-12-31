import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../models/User';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HaircutRecored } from '../models/HaircutRecored';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  public user = new BehaviorSubject<User>(new User());
  public appointmentList = new BehaviorSubject<HaircutRecored[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  async login(user: User){
    return await this.http.post("https://localhost:5001/api/users/authenticate", user).toPromise().then(res=>{
      this.user.next(<User>res);
      this.authService.setAuthToken((<any>res).token, <User>res)
      return res;
    });
  }

  async register(user: User){

    return await this.http.post("https://localhost:5001/api/users/register", user).toPromise().then(res=>{
      this.authService.setAuthToken((<any>res).Token, <User>res)
      this.user.next(<User>res);
      this.authService.setAuthToken((<any>res).token, <User>res)
      return res;
    });
    
  
  }

  async addAppointment(haircutRecored :HaircutRecored){
    return await this.http.post("https://localhost:5001/api/Haircut/addOrChangeAppointment", haircutRecored).toPromise().then(res=> {
      console.log(res);
    });
  }

  getAppointmentList() :Observable<HaircutRecored[]>{
    return this.http.get<HaircutRecored[]>("https://localhost:5001/api/Haircut/getAllAppointments")
  }

  deleteAppointmentList(userId: number){
    return this.http.get("https://localhost:5001/api/Haircut/deleteAppointment/" + userId)

  }

}
