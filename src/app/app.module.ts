import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppoitmentListComponent } from './appoitment-list/appoitment-list.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { AuthService } from './Services/auth.service';
import { AppointmentComponent } from './appointment/appointment.component';
import { DatePipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import { FilterPipe } from './Pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppoitmentListComponent,
    AppointmentComponent,
    FilterPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatRadioModule,
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatSortModule

  ],
  providers: [
    AuthService , 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
