import { Component, OnInit } from '@angular/core';
import {AnnouncementHttpService} from '../../services/announcement-http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private httpService: AnnouncementHttpService) { }

  announcements: any;

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
  ngOnInit() {
  }

}
