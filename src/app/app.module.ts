import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PersonDetail } from '../pages/details/person-detail';
import { AddressDetail } from '../pages/details/address-detail';

import { FormsModule , ReactiveFormsModule}    from '@angular/forms';

import { EmptyValidator } from '../validators/empty.validator';

import { PersonService } from '../services/person.service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PersonDetail,
    AddressDetail,
    EmptyValidator
  ],
  imports: [
    IonicModule.forRoot(MyApp), FormsModule , ReactiveFormsModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PersonDetail,
    AddressDetail
  ],
  providers: [ PersonService ] 
})
export class AppModule {}
