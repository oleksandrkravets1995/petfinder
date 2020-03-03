import { Component, OnInit } from '@angular/core';
import { AnnouncementsHttpService } from 'src/app/services/announcements-http.service';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss']
})

export class AnnouncementListComponent implements OnInit {
  announcements: any;
  title = '';
  p = 1;

  constructor(private httpService: AnnouncementsHttpService,
              private authService: AuthService) {}

  ngOnInit() {
    this.getAllPublished();
    this.title = '';
  }

  getAllPublished() {
    this.httpService.getAllPublished()
      .subscribe(
        data => {
            this.announcements = data;
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
    this.getAllPublished()
    this.title = '';
  }
}
