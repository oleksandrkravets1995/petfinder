import { Component, OnInit } from '@angular/core';
import { AnnouncementHttpService } from 'src/app/services/announcement-http.service';
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  announcements: any;
  currentAnnouncement = null;
  currentIndex = -1;
  title = '';
  currentAnnouncementId: any;

  constructor(private httpService: AnnouncementHttpService,
              ) {
  }

  ngOnInit() {
    this.retrieveAnnouncement();
    this.title = '';
  }

  retrieveAnnouncement() {

    this.httpService.getAll()
      .subscribe(
        data => {
          this.announcements = data;
          console.log(data);
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
    this.title = "";
  }

  test(announcement) {
    this.currentAnnouncement = announcement;
    this.currentAnnouncementId  = this.currentAnnouncement.announcement_id;
  }
}
