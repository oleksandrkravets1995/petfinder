import { Component, OnInit } from '@angular/core';
import {ExistUserHttpService} from "../../services/existUser-http.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


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

  pets = [
    {id: 1, name: "Cat"},
    {id: 2, name: "Dog"},
    {id: 3, name: "Fish"},
    {id: 4, name: "Parrot"}
  ];
  selectedPet = null;
  submitted = false;
  form: FormGroup;

  constructor(private httpUser: ExistUserHttpService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  createAnnouncement() {
    const data = {
      title: this.announcement.title,
      price: this.announcement.price,
      location: this.announcement.location,
      images: [{image:  this.announcement.image}],
      description: this.announcement.description,
      sections_id: this.selectedPet,
      user_id: 8,
      status: 'Not VERIFY'
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
