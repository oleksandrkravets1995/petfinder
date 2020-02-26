import { Component, OnInit } from '@angular/core';
import {AnnouncementsHttpService} from '../../services/announcements-http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private httpService: AnnouncementsHttpService) { }

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
