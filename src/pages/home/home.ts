import { Component , OnInit } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { PersonService } from '../../services/person.service';

import { Person } from '../../models/person.model';
import { PersonDetail } from '../details/person-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit{

  persons: Person[];
  person = new Person();

  constructor(public modalCtrl: ModalController, 
              public navCtrl: NavController,
              public personService: PersonService) {}

   ngOnInit(){  
         this.getAll(undefined);  
    }

   getAll(refresher){
      this.personService.getAll()
                  .subscribe(persons => {
                      this.persons = persons;
                      if(refresher != undefined)
                        refresher.complete();
                  })  
  }

  addPerson(){
     let modal = this.modalCtrl.create(PersonDetail,{
       person : undefined,
       homePage : this
     });
     modal.present();
  }

  goToPersonDetails(_person: Person) {
     this.navCtrl.push(PersonDetail, 
     {
       person : _person,
       homePage : this
     }
    );
  }

  removePerson(_person: Person){
     this.personService.remove(_person)
     .subscribe(person => {   
          var index = this.persons.indexOf(_person); 
          var auxPerson :Array<Person>=[];
            for(var i=0; i<this.persons.length; i++){
                  if(index != i){
                    auxPerson.push(this.persons[i]);
                  }
            }
            this.persons = auxPerson; 
      });   
    }

}