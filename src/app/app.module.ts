import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
/* import { HttpModule } from '@angular/http'; */
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { UserService } from './services/user.service';
import { GlobalService } from './services/global.service';
import { AuthguardService } from './services/authguard.service';
import {NoAuthguardService} from './services/noauthguard.service';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { ChatService } from './services/chat.service';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EditMediaComponent } from './pages/edit-media/edit-media.component';
import { ShopComponent } from './shop/shop.component';
import { HistoryComponent } from './history/history.component';
import { SavedpostComponent } from './savedpost/savedpost.component';
import { MycommentsComponent } from './mycomments/mycomments.component';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    HomeComponent,
    HeaderComponent,
    FriendsComponent,
    ProfileComponent,
    EditProfileComponent,
    EditMediaComponent,
    ShopComponent,
    HistoryComponent,
    SavedpostComponent,
    MycommentsComponent,
    TermsConditionComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    //HttpModule,
    HttpClientModule,
    JasperoAlertsModule,
    NgxCarouselModule
  ],
  providers: [UserService, GlobalService, AuthguardService,NoAuthguardService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
