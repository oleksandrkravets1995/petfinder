import { Component, OnInit } from '@angular/core';
import { AnnouncementsHttpService } from '../../services/announcements-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import {UsersHttpService} from '../../services/users-http.service';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.scss']
})

export class AnnouncementDetailsComponent implements OnInit {

  constructor(
    private httpAnnouncementService: AnnouncementsHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private httpUser: UsersHttpService,
    private authService: AuthService
  ) { }

  isLoading = false;
  currentAnnouncement = null;
  currentUser = null;
  currentID: number;


  ngOnInit() {
    this.getAnnouncement(this.route.snapshot.paramMap.get('id'));
    this.getUserId(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;
  }

  getAnnouncement(id) {
    this.httpAnnouncementService.get(id)
      .subscribe(
        data => {
          this.currentAnnouncement = data;
          this.isLoading = false;
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
