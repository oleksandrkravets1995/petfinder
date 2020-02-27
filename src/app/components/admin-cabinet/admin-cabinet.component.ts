import { Component, OnInit } from '@angular/core';
import {AnnouncementsHttpService} from "../../services/announcements-http.service";

@Component({
  selector: 'app-admin-cabinet',
  templateUrl: './admin-cabinet.component.html',
  styleUrls: ['./admin-cabinet.component.scss']
})
export class AdminCabinetComponent implements OnInit {
  announcements;
  displayedColumns: string[] = ['position', 'title', 'created_date', 'delete', 'publish', 'cancel'];
  timerId;
  title;
  count = 3;
  submitted = false;

  constructor(private httpAnnouncement: AnnouncementsHttpService) { }

  ngOnInit() {
    this.retrieveAnnouncement();
  }

  retrieveAnnouncement() {
    this.httpAnnouncement.getAllUnPublished()
      .subscribe(
        data => {
          this.announcements = data;
          console.log(this.announcements);
        },
        error => {
          console.log(error);
        });
  }

  deleteAnnouncement(element) {
    this.httpAnnouncement.delete(element.announcement_id)
      .subscribe(
        response => {
          this.setCountdown();
          this.retrieveAnnouncement();
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  setCountdown() {
    this.timerId = setInterval(() => {
      if (this.count === 1) {
        clearInterval(this.timerId);
        this.submitted = false;
        this.timerId = null;
        this.count = 4;
      }
      this.count = this.count - 1;
    }, 1000);
  }

  publishAnnouncement(element) {
    const data = {
      title: element.title,
      price: element.price,
      location: element.location,
      description: element.description,
      sections_id: element.announcements,
      status: 'VERIFY'
    };

    this.httpAnnouncement.update(element.announcement_id, data)
      .subscribe(
        response => {
          console.log(data)
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  cacnelAnnouncement(element) {
    const data = {
      title: element.title,
      price: element.price,
      location: element.location,
      description: element.description,
      sections_id: element.announcements,
      status: 'CANCEL'
    };

    this.httpAnnouncement.update(element.announcement_id, data)
      .subscribe(
        response => {
          console.log(data)
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }


}
