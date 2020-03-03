import {Component, OnInit} from '@angular/core';
import {UsersHttpService} from '../../services/users-http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AnnouncementsHttpService} from '../../services/announcements-http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmationDialogComponent} from "../../services/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-table-basic-flex-example',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class UsersCabinetComponent implements OnInit {
  constructor(private httpUser: UsersHttpService,
              private httpAnnouncements: AnnouncementsHttpService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private  authService: AuthService
             ) {
  }

  currentUser;
  displayedColumns: string[] = ['position', 'title', 'created_date', 'status', 'update', 'delete'];
  announcements;
  title;

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
        },
        error => {
          console.log(error);
        });
  }

  deleteAnnouncement(element) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you want delete this announcement?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpAnnouncements.delete(element.announcement_id)
          .subscribe(
            response => {
              this.snackBar.open('This announcement has been deleted successfully', '', {
                duration: 2000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-delete']
              });
              this.getUser(this.route.snapshot.paramMap.get('id'));
            },
            error => {
              console.log(error);
            });
      }
    });
  }
}
