import { Component, OnInit } from '@angular/core';
import { AnnouncementHttpService } from '../../services/announcement-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import {UserHttpService} from "../../services/user-http.service";

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.scss']
})
export class AnnouncementDetailsComponent implements OnInit {

  constructor(
    private httpAnnouncementService: AnnouncementHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private httpUser: UserHttpService
  ) { }

  ngOnInit() {

    this.getAnnouncement(this.route.snapshot.paramMap.get('id'));
    this.getUser(this.currentId)
  }
  currentAnnouncement = null;
  currentId = 8;
  currentUser: any;

  getAnnouncement(id) {
    this.httpAnnouncementService.get(id)
      .subscribe(
        data => {
          this.currentAnnouncement = data;
          this.currentId = this.currentAnnouncement.user_id;

        },
        error => {
          console.log(error);
        });
  }

  getUser(id) {
    this.httpUser.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


}
