import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { InfoComponent } from './components/info/info.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AnnouncementDetailsComponent} from './components/announcement-details/announcement-details.component';
import {AddAnnouncementComponent} from './components/add-announcement/add-announcement.component';

const routes: Routes = [
  { path: '', redirectTo: 'announcement', pathMatch: 'full' },
  { path: 'announcement', component: AnnouncementComponent },
  { path: 'info', component: InfoComponent },
  { path: 'login', component: LoginComponent},
  { path: 'announcement/:id', component: AnnouncementDetailsComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'add', component: AddAnnouncementComponent},
  { path: '**', redirectTo: 'announcement', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
