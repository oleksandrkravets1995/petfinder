import { Component, OnInit } from '@angular/core';
import {ExistUserHttpService} from "../../services/existUser-http.service";


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

  constructor(private httpUser: ExistUserHttpService) { }

  ngOnInit() {
  }

  createAnnouncement() {
    const data = {
      title: this.announcement.title,
      price: this.announcement.price,
      location: this.announcement.location,
      images: [{image:  this.announcement.image}],
      description: this.announcement.description,
      sections_id: 1,
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
  }

}
