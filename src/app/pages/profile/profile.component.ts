import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router/src/router';
import { window } from 'rxjs/operator/window';
import { resetFakeAsyncZone } from '@angular/core/testing';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})

export class ProfileComponent implements OnInit {

  user_id: String;
  param_id: String;
  follower_id: String;
  token: String;
  backend_url: String;
  friendrequest: Object;
  request_sent: Boolean = false;
  request_accepted: Boolean = false;
  showfollow: Boolean;
  showunfollow: Boolean;
  medias = [];
  likes: String;
  unlikes: String;
  followlist: String;


  profile = {
    'name': '',
    'country': '',
    'phone_no': '',
    'dob': '',
    'profile_pic': ''
  };

  constructor(private globalService: GlobalService, private userService: UserService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(
      params => {
        this.param_id = params.id;
      });
  }

  ngOnInit() {

    this.backend_url = this.globalService.backend_url;
    this.token = localStorage.getItem('token');
    this.user_id = localStorage.getItem('UserId');
    this.friendrequest = {
      'sender_id': '',
      'receiver_id': '',
      'status': ''
    }

    let current_user = {
      'id': this.param_id,
      'token': this.token
    };

    let verify_request = {
      'user1': this.user_id,
      'user2': this.param_id,
      'token': this.token
    };

    this.userService.current_user(current_user).subscribe((response) => {
      this.profile = response.data;
      // console.log('Profile => ', this.profile)
    });

    this.userService.check_request(verify_request).subscribe(

      response => {
        this.friendrequest = response.data;
        console.log('friend request => ', this.friendrequest)
      },
      err => {
        this.friendrequest = {};
      }
    );

    let follow_unfollow = {
      'user_id': this.user_id,
      'follower_id': this.param_id,
      'token': this.token
    };

    this.userService.check_follow_unfollow(follow_unfollow).subscribe((response) => {
      console.log('check follow response', response);
      if (response.success == true) {
        this.showunfollow = true;
      } else {
        this.showfollow = true;
      }
    });


    let data = {
      'user_id': this.param_id,
      'token': this.token
    };
    this.userService.mediauser(data).subscribe((response) => {
      console.log("user media from profile=>", response.data);
      for (var i = 0; i < response.data.length; i++) {
        var extn = response.data[i].split(".").pop();
        if (extn == 'jpg' || extn == 'jpeg' || extn == 'gif' || extn == 'png') {
          this.medias[i] = response.data[i];
          console.log("media from  profile", this.medias[i]);
          this.medias['type'] = "image";
          console.log(" profile========>", this.medias['type']);

        }
        if (extn == 'mov' || extn == 'mp4' || extn == 'webm' || extn == 'avi') {
          this.medias[i] = response.data[i];
          this.medias['type'] = "video";
          console.log("media from  profile", this.medias[i]);

        }

      }
    });

    this.userService.userfollowcount(data).subscribe((response) => {
      console.log("resonse from followlist==>", response.count);
      this.followlist = response.count;

    });
  }
  sendrequest() {
    let data = {
      'sender_id': this.user_id,
      'receiver_id': this.param_id,
      'status': 'pending',
      'token': this.token
    };
    this.userService.send_request(data).subscribe((response) => {
      console.log('send reponse', response);
      this.friendrequest = response.data;
      this.request_sent = true;
    });
  }

  follow() {
    let data = {
      'user_id': this.user_id,
      'follower_id': this.param_id,
      'token': this.token
    };
    this.showunfollow = true;
    this.showfollow = false;
    this.userService.follow_user(data).subscribe((response) => {
      console.log('send reponse', response);
      console.log("call from home page");

    });

  }
  unfollow() {

    let data = {
      'user_id': this.user_id,
      'follower_id': this.param_id,
      'token': this.token,
    };
    this.showfollow = true;
    this.showunfollow = false;
    this.userService.unfollow_user(data).subscribe((response) => {
      console.log('send response', response);
    });

  }

  response_req(status) {
    let data = {
      'sender_id': this.param_id,
      'receiver_id': this.user_id,
      'status': status,
      'token': this.token
    };
    this.userService.response_of_friend(data).subscribe((response) => {
      console.log('Req response', response)
      if (status === 'accepted') {
        this.friendrequest = response.data;
        this.request_accepted = true;
      }
      if (status === 'rejected') {
        this.friendrequest = {};
      }
    });
  }

  unfriend() {
    let data = {
      'user1': this.user_id,
      'user2': this.param_id,
      'token': this.token
    };
    this.userService.unfriend(data).subscribe((response) => {
      this.friendrequest = {};
    });
  }



}
