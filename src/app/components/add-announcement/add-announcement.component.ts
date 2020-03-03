import { Component, OnInit } from '@angular/core';
import {AddAnnouncementHttpService} from '../../services/add-announcement-http.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SectionsHttpService} from '../../services/sections-http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../services/auth.service';


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

  userId;
  pets;
  selectedPet = null;
  form: FormGroup;

  constructor(private httpUser: AddAnnouncementHttpService, private httpSections: SectionsHttpService,
              private snackBar: MatSnackBar,
              private authService: AuthService) { }


  ngOnInit() {
    this.pets = this.retrieveSections();
    this.userId = this.authService.user.user.user_id;

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
      user_id: this.userId,
      status: 'NOT_VERIFY'
    };

    this.httpUser.create(data)
      .subscribe(
        response => {
          this.snackBar.open('This announcement was sent. Wait for confirm.', '', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['snackbar-published']
          });
          this.cleanAnnouncementForm();
          console.log(response);
        },
        error => {
          console.log(error);
        });

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
  }

}
