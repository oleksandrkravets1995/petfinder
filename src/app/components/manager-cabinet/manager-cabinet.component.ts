import { Component, OnInit } from '@angular/core';
import {AnnouncementsHttpService} from '../../services/announcements-http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../services/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-cabinet',
  templateUrl: './manager-cabinet.component.html',
  styleUrls: ['./manager-cabinet.component.scss']
})

export class ManagerCabinetComponent implements OnInit {
  announcements = {};
  isLoading = false;
  displayedColumns: string[] = ['position', 'title', 'created_date', 'delete', 'publish', 'refusal'];
  durationInSeconds = 2;

  constructor(private httpAnnouncement: AnnouncementsHttpService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {

    this.retrieveAnnouncement();
    this.isLoading = true;
  }

  retrieveAnnouncement() {
    this.httpAnnouncement.getAllUnPublished()
      .subscribe(
        data => {
          this.isLoading = false;
          this.announcements = data;
        },
        error => {
          console.log(error);
        });
  }

  publishAnnouncement(element) {
    const data = {
      title: element.title,
      price: element.price,
      location: element.location,
      description: element.description,
      sections_id: element.announcements,
      status: 'VERIFY'
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you want publish this announcement?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpAnnouncement.update(element.announcement_id, data)
          .subscribe(
            response => {
              this.snackBar.open('This announcement has been published successfully', '', {
                duration: this.durationInSeconds * 1000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-published']
              });
              this.retrieveAnnouncement();
            },
            error => {
              console.log(error);
            });
      }
    });
  }

  refusalAnnouncement(element) {
    const data = {
      title: element.title,
      price: element.price,
      location: element.location,
      description: element.description,
      sections_id: element.announcements,
      status: 'CANCEL'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you want refuse this announcement?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpAnnouncement.update(element.announcement_id, data)
          .subscribe(
            response => {
              this.snackBar.open('This announcement has been refused successfully', '', {
                duration: this.durationInSeconds * 1000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-refused']
              });
              this.retrieveAnnouncement();
            },
            error => {
              console.log(error);
            });
      }
    });
  }

  deleteAnnouncement(element): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you want delete this announcement?'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(element.user.email)
      if (result) {
        this.httpAnnouncement.delete(element.announcement_id)
          .subscribe(
            response => {
              this.snackBar.open('This announcement has been deleted successfully', '', {
                duration: this.durationInSeconds * 1000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-delete']
              });
              this.retrieveAnnouncement();
            },
            error => {
              console.log(error);
            });
      }
    });
  }
}
