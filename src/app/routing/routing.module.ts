import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../services/authguard.service';
import {NoAuthguardService} from '../services/noauthguard.service'
import { LoginComponent } from '../pages/login/login.component';
import { ForgotComponent } from '../pages/forgot/forgot.component';
import { HomeComponent } from '../pages/home/home.component';
import { FriendsComponent } from '../pages/friends/friends.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { EditProfileComponent } from '../pages/edit-profile/edit-profile.component'
import { EditMediaComponent } from '../pages/edit-media/edit-media.component'
import { ShopComponent } from '../shop/shop.component';
import { HistoryComponent } from '../history/history.component';
import { SavedpostComponent } from '../savedpost/savedpost.component';
import { MycommentsComponent } from '../mycomments/mycomments.component';
import {TermsConditionComponent} from '../pages/terms-condition/terms-condition.component'
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
const appRoutes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [NoAuthguardService],
  },
  {
    path: 'terms',
    component: TermsConditionComponent,
    canActivate: [NoAuthguardService],
  },
  { 
    path: 'shop', 
    component: ShopComponent 
  },

  { 
    path: 'forgotpassword', 
    component: ForgotComponent,
    canActivate: [NoAuthguardService],
  },
  {
    path: 'resetpassword/:id',
    component: ResetPasswordComponent
  },
  {     
    path: 'home', 
    canActivate: [AuthguardService],
    component: HomeComponent 
  },
  {     
    path: 'friends', 
    canActivate: [AuthguardService],
    component: FriendsComponent 
  },
  {     
    path: 'history', 
    canActivate: [AuthguardService],
    component: HistoryComponent 
  },
  
  {     
    path: 'profile/:id', 
    canActivate: [AuthguardService],
    component: ProfileComponent 
  },
  {     
    path: 'savedpost', 
    canActivate: [AuthguardService],
    component: SavedpostComponent 
  },
  {     
    path: 'mycomment', 
    canActivate: [AuthguardService],
    component: MycommentsComponent 
  },
  {
    path:'edit',
    canActivate: [AuthguardService],
    component: EditProfileComponent
  },
  {
    path:'editMedia/:id',
    canActivate: [AuthguardService],
    component: EditMediaComponent
  },
  
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    redirectTo: '/login '
  }  
];

@NgModule({
  imports: [   
    RouterModule.forRoot(
      appRoutes,
      { 
        //enableTracing: true 
      } // <-- debugging purposes only
    ) 
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
function newFunction(): string {
  return 'history';
}

