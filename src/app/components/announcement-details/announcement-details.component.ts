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
  currentImage = null;
  currentID: number;

  ngOnInit() {
    this.getAnnouncement(this.route.snapshot.paramMap.get('id'));
    this.getAnnouncementId(this.route.snapshot.paramMap.get('id'));
  }

  getAnnouncement(id) {
    this.httpAnnouncementService.get(id)
      .subscribe(
        data => {
          this.currentAnnouncement = data;
        },
        error => {
          console.log(error);
        });
  }

  getAnnouncementId(id) {
    this.httpAnnouncementService.get(id)
      .subscribe(
        data => {
          this.currentAnnouncement = data;
          this.currentID = this.currentAnnouncement.user_id;
          this.getUser(this.currentID);
          // console.log(this.getImages(1))
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

  // getImages(id) {
  //   this.httpImages.get(id)
  //     .subscribe(
  //       data => {
  //         this.currentImage = data;
  //         console.log(this.currentImage);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
}
