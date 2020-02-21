import { Component, OnInit } from '@angular/core';
import { AnnouncementHttpService } from '../../services/announcement-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import {UserHttpService} from '../../services/user-http.service';
import {ImagesHttpService} from '../../services/images-http.service';



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
    private httpUser: UserHttpService,
    private httpImages: ImagesHttpService
  ) { }

  currentAnnouncement = null;
  currentUser = null;
  images = null;
  currentID: number;

  ngOnInit() {
    this.getAnnouncement(this.route.snapshot.paramMap.get('id'));
    this.getUserId(this.route.snapshot.paramMap.get('id'));
  }

  getAnnouncement(id) {
    this.httpAnnouncementService.get(id)
      .subscribe(
        data => {
          this.currentAnnouncement = data;
          console.log(this.currentAnnouncement.images[0].image);
        },
        error => {
          console.log(error);
        });
  }

  getUserId(id) {
    this.httpAnnouncementService.get(id)
      .subscribe(
        data => {
          this.currentAnnouncement = data;
          this.currentID = this.currentAnnouncement.user_id;
          this.getUser(this.currentID);
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
        },
        error => {
          console.log(error);
        });
  }

}
