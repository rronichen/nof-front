import { DatePipe } from '@angular/common';
import { Component, OnInit , OnDestroy, ViewChild} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { appointmentTimeOption } from '../models/appointmentTimeOption';
import { HaircutRecored } from '../models/HaircutRecored';
import { User } from '../models/User';
import { APIService } from '../Services/api.service';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-appoitment-list',
  templateUrl: './appoitment-list.component.html',
  styleUrls: ['./appoitment-list.component.scss']
})
export class AppoitmentListComponent implements OnInit, OnDestroy {

  constructor(private apiService : APIService, private datePipe: DatePipe) { }

  @ViewChild("tooltip" ,{static: true}) matTooltip: MatTooltip | undefined;
  user: User = new User();
  appointmentList: HaircutRecored[] = [];
  sortedData : HaircutRecored[] = [];

  appointmetSubscription : Subscription = new Subscription();
  appointmentTimeOptionList: appointmentTimeOption[] = [];
  chooshenHour:string = "";
  searchText: string = "";
  intitialDisableTooltip = true;


  ngOnInit(): void {
    this.apiService.user.subscribe(u=> {
      this.user = u;
    });
    
    this.getAppointmentList();
  }

  ngOnDestroy(): void {
    this.appointmetSubscription.unsubscribe();
  }

  getAppointmentList(){
    this.appointmetSubscription = this.apiService.getAppointmentList().subscribe(res => {

      this.appointmentList = res;
      this.setAppointmentTimeOptionList();
      this.sortedData = this.appointmentList.slice();
    })
  }

  onAdd(){
    this.chooshenHour;
    let today = new Date();

    let hour = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), parseInt( this.chooshenHour), 0, 0);
    let hcr = new HaircutRecored();
    hcr.appointmentTime = hour;
    hcr.user = this.user;
    this.apiService.addAppointment(hcr).then(r=>{
      this.getAppointmentList();
      this.setAppointmentTimeOptionList();
    });
  }

  onDeleteAppointment(userId: any){
    this.apiService.deleteAppointmentList(userId).subscribe(res=> {
      this.getAppointmentList();
      this.setAppointmentTimeOptionList();
    });
  }

  tooltipText(appointment: HaircutRecored){
    return `שעת התור: ${this.datePipe.transform(appointment.appointmentTime, 'HH:mm')} שעת יצירת התור 
      ${this.datePipe.transform(appointment.appointmentTimeCreated, 'HH:mm')} `;
  }

  setAppointmentTimeOptionList(){
    let notAvailableHours= [];
    for(let i = 0; i < this.appointmentList.length; i++){
      let h = new Date(this.appointmentList[i].appointmentTime).getHours();
      notAvailableHours.push(h);
    }

    for(let hour = 9; hour <= 17; hour++){
      let appoint = new appointmentTimeOption();
      appoint.hour = hour.toString();
      appoint.isAvailable = !notAvailableHours.includes(hour);
      this.appointmentTimeOptionList.push(appoint);
    }
  }

  sortData(sort: Sort) {
    const data = this.appointmentList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date':
          return this.compare(a.appointmentTime, b.appointmentTime, isAsc);
        case 'name':
          return this.compare(a.user.firstName, a.user.firstName, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


}
