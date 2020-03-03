import { Component, OnInit } from '@angular/core';
import {AnnouncementsHttpService} from '../../services/announcements-http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionsHttpService} from '../../services/sections-http.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-announcement',
  templateUrl: './update-announcement.component.html',
  styleUrls: ['./update-announcement.component.scss']
})
export class UpdateAnnouncementComponent implements OnInit {
  announcement;
  pets;
  selectedPet;
  isLoading = false;

  constructor(private httpAnnouncementService: AnnouncementsHttpService,
              private httpSections: SectionsHttpService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.getAnnouncement(this.route.snapshot.paramMap.get('id'));
    this.pets = this.retrieveSections();
    this.isLoading = true;
  }

  getAnnouncement(id) {
    this.httpAnnouncementService.get(id)
      .subscribe(
        data => {
          if (data) {
            this.announcement = data;
            this.selectedPet = this.announcement.sections_id;
            this.isLoading = false;
            console.log(this.announcement);
          }
        },
        error => {
          console.log(error);
        });
  }

  retrieveSections() {
    this.httpSections.getAll()
      .subscribe(
        data => {
          this.pets = data;
        },
        error => {
          console.log(error);
        });
  }

  updateAnnouncement() {
    const data = {
      title: this.announcement.title,
      price: this.announcement.price,
      location: this.announcement.location,
      images: [{
        image: this.announcement.images[0].image,
        images_id: this.announcement.images[0].images_id
      }],
      description: this.announcement.description,
      sections_id: this.selectedPet,
      status: 'NOT_VERIFY'
    };

    this.httpAnnouncementService.update(this.announcement.announcement_id, data)
      .subscribe(
        response => {
          this.snackBar.open('This announcement has been fixed successfully. Wait for confirm.', '', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['snackbar-published']
          });
          console.log(data)
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}
