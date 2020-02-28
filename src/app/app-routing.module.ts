import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AnnouncementDetailsComponent} from './components/announcement-details/announcement-details.component';
import {AddAnnouncementComponent} from './components/add-announcement/add-announcement.component';
import {UsersCabinetComponent} from './components/users-cabinet/cabinet.component';
import {UpdateAnnouncementComponent} from './components/update-announcement/update-announcement.component';
import {ManagerCabinetComponent} from './components/manager-cabinet/manager-cabinet.component';
import {AdminCabinetComponent} from './components/admin-cabinet/admin-cabinet.component';

const routes: Routes = [
  { path: '', redirectTo: 'announcements', pathMatch: 'full' },
  { path: 'info', component: InfoPageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'announcements', component: AnnouncementListComponent},
  { path: 'announcement/:id', component: AnnouncementDetailsComponent},
  { path: 'announcement-add', component: AddAnnouncementComponent},
  { path: 'announcement-update/:id', component: UpdateAnnouncementComponent},
  { path: 'cabinet-user/:id', component: UsersCabinetComponent},
  { path: 'cabinet-manager', component: ManagerCabinetComponent},
  { path: 'cabinet-admin', component: AdminCabinetComponent},
  { path: '**', redirectTo: 'announcements', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
