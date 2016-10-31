import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { PersonService } from '../../services/person.service';

import { HomePage } from '../home/home';
import { Person } from '../../models/person.model';
import { Address } from '../../models/address.model';

import { AddressDetail } from '../details/address-detail';

@Component({
  selector: 'person-detail',
  templateUrl: 'person-detail.html'
})

export class PersonDetail{

      edit = false;
      person = new Person();
      homePage : HomePage;

      constructor(public modalCtrl: ModalController,
                  public navCtrl: NavController,
                  private navParams: NavParams, 
                  public personService: PersonService, 
                  public viewCtrl: ViewController) {

          var person = navParams.get('person');
          this.homePage = navParams.get('homePage');

          if(person != undefined){  
            this.person = <Person> JSON.parse(JSON.stringify(navParams.get('person')));  
            this.edit = true;
          }
      }

      onSubmit(){
          if(this.edit)
              this.refresh();
          else
              this.add();
      }

       add(){
          this.personService.add(this.person)
          .subscribe(person => {   
            this.homePage.persons.push(person);
            this.dismiss(); 
          });
        }

        dismiss(){
            this.viewCtrl.dismiss();
        }

      refresh(){
          this.personService.update(this.person)
          .subscribe(person => {  
              alert('Updated !')  
          });
        }

        addAddress(){
          let modal = this.modalCtrl.create(AddressDetail,{
            person : this.person,
            address : undefined,
            homePage : this
          });
          modal.present();
        }

        removeAddress(address:Address){
            var index = this.person.address.indexOf(address);
            var auxAddress :Array<Address>=[];
              for(var i=0; i<this.person.address.length; i++){
                      if(index != i){
                        auxAddress.push(this.person.address[i]);
                      }
              }
              this.person.address = auxAddress;
          }
        
      goToAddressDetails(_address: AddressDetail) {
          this.navCtrl.push(AddressDetail, 
          {
            person : this.person,
            address : _address,
            homePage : this
          });
      }

}