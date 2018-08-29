import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  private subject = new Subject<any>();
  public api_url: any;
  public backend_url: any;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.api_url = this.global.api_url;
    this.backend_url = this.global.backend_url;
  }

  
  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  register(data): Observable<any> {
    let url = this.api_url.concat('register');
    return this.http.post(url, data).map(response => response);
  }

  login(data): Observable<any> {
    let url = this.api_url.concat('login');
    return this.http.post(url, data).map(response => response);
  }

  checkemail(data): Observable<any> {
    let url = this.api_url.concat('checkemail');
    return this.http.post(url, data).map(response => response);
  }

  forgot_password(data): Observable<any> {
    let url = this.api_url.concat('forgotpassword');
    return this.http.post(url, data).map(response => response);
  }

  reset_password(data): Observable<any> {
    let url = this.api_url.concat('resetpassword');
    return this.http.post(url, data).map(response => response);
  }

  current_user(data): Observable<any> {
    let url = this.api_url.concat('getuser');
    return this.http.post(url, data).map(response => response);
  }

  get_status(data): Observable<any> {
    let url = this.api_url.concat('getstatus');
    return this.http.post(url, data).map(response => response);
  }

  uploadprofilepic(data): Observable<any> {
    let newdata = new FormData();
    newdata.append('id', data.id);
    newdata.append('profile_pic', data.profile_pic);
    let url = this.api_url.concat('upload_profilepicture');
    return this.http.post(url, newdata).map(response => response);
  }

  upload_file(data): Observable<any> {
    let newdata = new FormData();
    newdata.append('id', data.id);
    newdata.append('upload_file', data.upload_file);
    let url = this.api_url.concat('uploadmedia');
    return this.http.post(url, newdata).map(response => response);
  }

  MediaSet(data): Observable<any> {
    let url = this.api_url.concat('MediaSet');
    return this.http.post(url, data).map(response => response);
  }

  upload_media(data): Observable<any> {
    let newdata = new FormData();
    newdata.append('postId', data.postId);
    newdata.append('userId', data.id);
    newdata.append('itemId', data.itemId);
    newdata.append('upload_file', data.upload_file);
    newdata.append('oldfile', data.oldfile);
    let url = this.api_url.concat('updateMedia');
    return this.http.post(url, newdata).map(response => response);
  }


  delmedia(data): Observable<any> {
    let url = this.api_url.concat('delIndividualmedia');
    return this.http.post(url, data).map(response => response);
  }

  status(data): Observable<any> {
    let url = this.api_url.concat('updatestatus');
    return this.http.post(url, data).map(response => response);
  }


  get_countries(): Observable<any> {
    let url = this.api_url.concat('countries');
    return this.http.get(url).map(response => response);
  }

  search_users(data): Observable<any> {
    let url = this.api_url.concat('searchfriends');
    return this.http.post(url, data).map(response => response);
  }

  send_request(data): Observable<any> {
    let url = this.api_url.concat('sendfriendrequest');
    return this.http.post(url, data).map(response => response);
  }

  check_request(data): Observable<any> {
    let url = this.api_url.concat('verifyrequest');
    return this.http.post(url, data).map(response => response);
  }

  response_of_friend(data): Observable<any> {
    let url = this.api_url.concat('friendrequestresponse');
    return this.http.post(url, data).map(response => response);
  }

  friend_list(data): Observable<any> {
    let url = this.api_url.concat('friendlist');
    return this.http.post(url, data).map(response => response);
  }

  friendreq_alerts(data): Observable<any> {
    let url = this.api_url.concat('friendrequest_alerts');
    return this.http.post(url, data).map(response => response);
  }

  unfriend(data): Observable<any> {
    let url = this.api_url.concat('unfriend');
    return this.http.post(url, data).map(response => response);
  }

  follow_user(data): Observable<any> {
    let url = this.api_url.concat('follow');
    return this.http.post(url, data).map(response => response);
  }

  unfollow_user(data): Observable<any> {
    let url = this.api_url.concat('unfollow');
    return this.http.post(url, data).map(response => response);
  }

  check_follow_unfollow(data): Observable<any> {
    let url = this.api_url.concat('check_follow_unfollow');
    return this.http.post(url, data).map(response => response);
  }

  suggestedfriends(data): Observable<any> {
    console.log('in sugges service', data)
    let url = this.api_url.concat('friendsuggestion');
    return this.http.post(url, data).map(response => response);
  }

  mediauser(data): Observable<any> {
    console.log("in media user");
    let url = this.api_url.concat('usermedia');
    return this.http.post(url, data).map(response => response);

  }
  lastUplodedUserMedia(data): Observable<any> {
    console.log("in media user");
    let url = this.api_url.concat('lastUplodedUserMedia');
    return this.http.post(url, data).map(response => response);

  }

  likes(data): Observable<any> {
    let url = this.api_url.concat('likes');
    return this.http.post(url, data).map(response => response);
  }

  likeunlike(data): Observable<any> {
    let url = this.api_url.concat('likes');
    return this.http.post(url, data).map(response => response);
  }

  getLikesUnlikes(data): Observable<any> {
    let url = this.api_url.concat('likesUnlikes');
    return this.http.post(url, data).map(response => response);
  }

  medialist(data): Observable<any> {
    let url = this.api_url.concat('listusermedia');
    return this.http.post(url, data).map(response => response);

  }

  getMediapost(data): Observable<any> {
    let url = this.api_url.concat('getIndividualMedia');
    return this.http.post(url, data).map(response => response);

  }
  getHistoryUser(data): Observable<any> {
    let url = this.api_url.concat('getSavePostUser');
    return this.http.post(url, data).map(response => response);

  }

  userProfile(data): Observable<any> {           //Get profile of user according to their id
    let url = this.api_url.concat('getProfile');  //Call getProfile api
    return this.http.post(url, data).map(response => response)
  }

  editprofile(data): Observable<any> {
    console.log("edit profile in user service ");
    let url = this.api_url.concat('editProfile');
    return this.http.post(url, data).map(response => response);
  }
  userfollowcount(data): Observable<any> {
    let url = this.api_url.concat('followlist');
    return this.http.post(url, data).map(response => response);
  }

  logout(data): Observable<any> {
    let url = this.api_url.concat('logout');
    return this.http.post(url, data).map(response => response);
  }

  commentPost(data): Observable<any> {
    let url = this.api_url.concat('postComment');
    return this.http.post(url, data).map(response => response);
  }
  getComment(data): Observable<any> {
    let url = this.api_url.concat('getAllComments');
    return this.http.post(url, data).map(response => response);
  }

  getusercomment(data): Observable<any> {
    let url = this.api_url.concat('getIndividualUserComment');
    return this.http.post(url, data).map(response => response);
  }

  commentget(data): Observable<any> {
    let url = this.api_url.concat('getComment');
    return this.http.post(url, data).map(response => response);
  }

  commentedit(data): Observable<any> {
    let url = this.api_url.concat('editComment');
    return this.http.post(url, data).map(response => response);
  }
  commentdelete(data): Observable<any> {
    let url = this.api_url.concat('deleteComment');
    return this.http.post(url, data).map(response => response);
  }

  commentreply(data): Observable<any> {
    let url = this.api_url.concat('userReplyComment');
    return this.http.post(url, data).map(response => response);
  }

  postsave(data): Observable<any> {
    let url = this.api_url.concat('savePost');
    return this.http.post(url, data).map(response => response);
  }
  commentreplyget(data): Observable<any> {
    let url = this.api_url.concat('getReplyComment');
    return this.http.post(url, data).map(response => response);
  }
  getreplycomment(data): Observable<any> {
    let url = this.api_url.concat('getReplyComment');
    return this.http.post(url, data).map(response => response);
  }
  online(data): Observable<any> {
    let url = this.backend_url.concat('Online');
    return this.http.post(url, data).map(response => response);
  }

  getsavePosts(data): Observable<any> {
    let url = this.api_url.concat('getSavePostUser');
    return this.http.post(url, data).map(response => response);
  }
  removeSavepost(data): Observable<any> {
    let url = this.api_url.concat('PostSaveremove');
    return this.http.post(url, data).map(response => response);
  }
  remove_suggestion(data): Observable<any> {
    let url = this.api_url.concat('Removesuggestion');
    return this.http.post(url, data).map(response => response);
  }
}

