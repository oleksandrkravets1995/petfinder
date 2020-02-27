import {Component, OnInit} from '@angular/core';
import {UsersHttpService} from "../../services/users-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AnnouncementsHttpService} from "../../services/announcements-http.service";

@Component({
  selector: 'app-table-basic-flex-example',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class UsersCabinetComponent implements OnInit {
  constructor(private httpUser: UsersHttpService,
              private httpAnnouncements: AnnouncementsHttpService,
              private route: ActivatedRoute,
              private router: Router) { }
  currentUser;
  displayedColumns: string[] = ['position', 'title', 'created_date', 'status', 'update', 'delete'];
  announcements;
  title;
  submitted = false;
  count = 3;
  timerId = null;

  ngOnInit() {
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id) {
    this.httpUser.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          this.announcements = this.currentUser.announcements;
          this.title = this.announcements.title;
          console.log(this.announcements);
        },
        error => {
          console.log(error);
        });
  }

  deleteAnnouncement(element) {
    this.httpAnnouncements.delete(element.announcement_id)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.getUser(this.route.snapshot.paramMap.get('id'));
          this.setCountdown();
        },
        error => {
          console.log(error);
        });
  }

  setCountdown() {
    this.timerId = setInterval(() => {
      if (this.count === 1) {
        clearInterval(this.timerId);
        this.submitted = false;
        this.timerId = null;
        this.count = 4;
      }
      this.count = this.count - 1;
    }, 1000);
  }


}
