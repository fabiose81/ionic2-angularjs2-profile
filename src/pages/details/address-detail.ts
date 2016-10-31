import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PersonService } from '../../services/person.service';

import { Person } from '../../models/person.model';
import { Address } from '../../models/address.model';

import { HomePage } from '../home/home';


@Component({
  selector: 'address-detail',
  templateUrl: 'address-detail.html'
})

export class AddressDetail {

        edit = false;
        person = new Person();
        address = new Address();
        homePage : HomePage;

        constructor(public navCtrl: NavController,
                    private navParams: NavParams, 
                    public personService: PersonService, 
                    public viewCtrl: ViewController) {
        
            this.address = navParams.get('address');
            this.person = navParams.get('person');
            this.homePage = navParams.get('homePage');

            if (navParams.get('address') != undefined){
                this.address = <Address> JSON.parse(JSON.stringify(navParams.get('address')));  

              for(var i=0; i<this.person.address.length; i++){
                      if(this.person.address[i].id == this.address.id){
                        this.person.address[i] = this.address;
                        break;
                      }
              }
                this.edit = true;
            }else{
                this.address = new Address();
                if(this.person.address == undefined){
                    var auxAdress :Array<Address>=[];
                    this.person.address = auxAdress;
                }            
            }
        }

        onSubmit(){
            if(!this.edit)
               this.person.address.push(this.address);

               this.dismiss();
        }

        dismiss(){
            this.viewCtrl.dismiss();
        }

}