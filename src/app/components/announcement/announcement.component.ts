import { Component, OnInit } from '@angular/core';
import { AnnouncementHttpService } from 'src/app/services/announcement-http.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})

export class AnnouncementComponent implements OnInit {
  announcements: any;
  title = '';

  constructor(private httpService: AnnouncementHttpService) {}

  ngOnInit() {
    this.retrieveAnnouncement();
    this.title = '';
  }

  retrieveAnnouncement() {
    this.httpService.getAll()
      .subscribe(
        data => {
          this.announcements = data;
          console.log( this.announcements);
        },
        error => {
          console.log(error);
        });
  }

  searchTitle() {
    this.httpService.findByTitle(this.title)
      .subscribe(
        data => {
          this.announcements = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshAnnouncementList() {
    this.retrieveAnnouncement()
    this.title = '';
  }
}
