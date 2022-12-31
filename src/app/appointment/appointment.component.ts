import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HaircutRecored } from '../models/HaircutRecored';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  @Input() appointment : HaircutRecored = new HaircutRecored();
  @Output() deleteAppointment: EventEmitter<any> = new EventEmitter();
  @Input() isSameUser : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  delete(){
    this.deleteAppointment.next(this.appointment.user.id);
  }

}
