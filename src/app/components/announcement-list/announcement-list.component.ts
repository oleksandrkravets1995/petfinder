import { Component, OnInit } from '@angular/core';
import { AnnouncementsHttpService } from 'src/app/services/announcements-http.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss']
})

export class AnnouncementListComponent implements OnInit {
  announcements: any;
  title = '';

  constructor(private httpService: AnnouncementsHttpService) {}

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
