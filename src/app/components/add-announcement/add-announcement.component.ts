import { Component, OnInit } from '@angular/core';
import {AddAnnouncementHttpService} from '../../services/add-announcement-http.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SectionsHttpService} from '../../services/sections-http.service';


@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent implements OnInit {
  announcement = {
    title: '',
    price: '',
    location: '',
    image: '',
    description: ''
  };

  pets;
  selectedPet = null;
  submitted = false;
  form: FormGroup;

  constructor(private httpUser: AddAnnouncementHttpService, private httpSections: SectionsHttpService) { }

  ngOnInit() {
    this.pets = this.retrieveSections();

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  retrieveSections() {
    this.httpSections.getAll()
      .subscribe(
        data => {
          this.pets = data;
          console.log( this.pets);
        },
        error => {
          console.log(error);
        });
  }

  createAnnouncement() {
    const data = {
      title: this.announcement.title,
      price: this.announcement.price,
      location: this.announcement.location,
      images: [{image: this.announcement.image}],
      description: this.announcement.description,
      sections_id: this.selectedPet,
      user_id: 80,
      status: 'NOT_VERIFY'
    };

    this.httpUser.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });

    this.submitted = true;
  }

  cleanAnnouncementForm() {
    this.announcement = {
      title: '',
      price: '',
      location: '',
      image: '',
      description: ''
    };
    this.selectedPet = null;
    this.submitted = false;
  }

}
