import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';
import { Subscription } from 'rxjs/Subscription';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AlertsService } from '@jaspero/ng2-alerts';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  userId: String;
  modalRef: BsModalRef;
  backend_url: String;
  token: String;
  postid: String;
  user_id: String;
  name: String;
  medias = [];
  posts = [];
  likeshow: Boolean = true;
  likeshows: Boolean = false;
  countlike: String;
  index: String;
  indexs: String;
  comment: String;
  comments: String;
  showcomment: Boolean = false;
  showcomments: Boolean = false;
  allcomments = [];
  commentid: String;
  commentedit: String;
  editshow: Boolean = true;
  otherid: String;
  comment_id: String;
  replyComment: String;
  commentreply = [];
  commentsreply = [];
  commentshow: Boolean = false;
  commentsshow: Boolean = false;
  postLatestMedia = [];
  message: any;
  subscription: Subscription;
  commentPostId: any;
  CommentIndex: any;
  AllLikes: any;
  totalLikesofPost : any;

  constructor(private globalService: GlobalService, private _alert: AlertsService, private userService: UserService, private route: Router, private modalService: BsModalService) { }

  public carouselOne: NgxCarousel;

  ngOnInit() {

    this.subscription = this.userService.getMessage().subscribe(message => {
      this.media();
    });

    this.carouselOne = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true
    }

    this.backend_url = this.globalService.backend_url;
    this.userId = localStorage.getItem('UserId');
    this.token = localStorage.getItem('token');
    this.media();
    let data = { 'user_id': this.userId, 'token': this.token };
    this.getUserLikes(data);
    this.userService.medialist(data).subscribe((response) => {
      for (var media = 0; media < response.data.length; media++) {
        this.posts[media] = [];
        this.posts[media]['name'] = response.name[media];
        this.posts[media]['id'] = response.postId[media];
        this.posts[media]['likes'] = response.count[media];
        this.posts[media]['index'] = media;
        this.posts[media]['user_id'] = response.user_id[media];
        this.posts[media]['item_id'] = response.postItemIds[media];
        this.posts[media]['currentuser'] = this.userId;
        for (var post = 0; post < response.data[media].length; post++) {
          this.posts[media][post] = [];
          var ext = response.data[media][post].split(".").pop();     //To check extension of mediafiles
          if (ext == 'mov' || ext == 'mp4' || ext == 'mkv' || ext == 'avi' || ext == 'webm') {
            this.posts[media][post]['post'] = response.data[media][post];
            this.posts[media][post]['type'] = 'video';
            this.posts[media][post]['itemId'] = response.postItemIds[media][post];
            this.posts[media][post]['name'] = response.user_id[media].name;
            this.posts[media][post]['country'] = response.user_id[media].country;
            this.posts[media][post]['profile_pic'] = response.user_id[media].profile_pic
          } else if (ext == 'gif' || ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
            this.posts[media][post]['post'] = response.data[media][post];
            this.posts[media][post]['type'] = 'image';
            this.posts[media][post]['itemId'] = response.postItemIds[media][post];
            this.posts[media][post]['name'] = response.user_id[media].name;
            this.posts[media][post]['country'] = response.user_id[media].country;
            this.posts[media][post]['profile_pic'] = response.user_id[media].profile_pic
          }
        }

      }
    });

    console.log(this.posts);

    $(document).ready(function () {

     });
  }

  callme() {
    console.log("called when iam ready")
  }

  getUserLikes(data) {

    this.userService.getUserLikes(data).subscribe((response) => {
      this.AllLikes = response.data;
    });
  }

  isLike(itemId, userid) {
    if(typeof this.AllLikes !=  "undefined" )
    {
    var lengthLikes = this.AllLikes.filter(function (other) {
      return other.post_id == itemId && other.user_id == userid
    });
    if (lengthLikes.length > 0) {
      return false;
    }
    else {
      return true;
    }
  }
  }


  media() {
    this.userId = localStorage.getItem('UserId');
    this.token = localStorage.getItem('token');
    let uid = { 'user_id': this.userId, 'token': this.token }
    this.medias = [];
    this.userService.lastUplodedUserMedia(uid).subscribe((response) => {
      for (var i = 0; i < response.data.length; i++) {
        this.medias[i] = [];
        var extn = response.data[i].split(".").pop();
        if (extn == 'jpg' || extn == 'jpeg' || extn == 'gif' || extn == 'png') {
          this.medias[i]['post'] = response.data[i];
          this.medias[i]['type'] = 'image';
          this.medias[i]['itemId'] = response.itemIds[i];
          this.medias[i]['name'] = response.user.name;
          this.medias[i]['country'] = response.user.country;
          this.medias[i]['profile_pic'] = response.user.profile_pic
        }
        if (extn == 'mov' || extn == 'mp4' || extn == 'webm' || extn == 'avi') {
          this.medias[i]['post'] = response.data[i];
          this.medias[i]['type'] = 'video';
          this.medias[i]['itemId'] = response.itemIds[i];
          this.medias[i]['name'] = response.user.name;
          this.medias[i]['country'] = response.user.country;
          this.medias[i]['profile_pic'] = response.user.profile_pic
        }
      }
    });
    console.log(this.media);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  closeModal() {
    this.modalRef.hide();
  }



  like(post, userId, index, islike, event) {
    let data1 = { 'user_id': this.userId, 'token': this.token };
    let data = {
      'user_id': userId,
      'post_id': post,
      'token': this.token
    };
    this.userService.likes(data).subscribe((response) => {
      this.getUserLikes(data1);
      this.index = index;
      this.countlike = response.likes;
      console.log('user likes', response);
    });
  }

 

  postComment(event, postId, index) {
    this.comments = (event.target.value).trim();
    if(this.comments != "")
    {
    let data = {
      'user_id': this.userId,
      'post_id': postId,
      'comment': this.comments,
      'token': this.token
    }
    this.userService.commentPost(data).subscribe((response) => {
      console.log("response from comment post api", response);
      this.allComment(postId, index);
      this.comments = event.target.value = '';
    })
  }
  else
  {
    return false;
  }
  }

  addComment(template, postId, indexs) {
    this.openModal(template);
    this.commentPostId = postId
    this.CommentIndex = indexs;
    this.allComment(postId, indexs);
    this.getTotalLikesOfPost(postId);
  };


  getTotalLikesOfPost(postId)
  {
    let uid = { 'post_id': postId, 'token': this.token };
    this.userService.GetLikesOfPost(uid).subscribe((response) => {
      this.totalLikesofPost = response.data.length
    })
  }

  public allComment(postId, indexs) {
    let data = {
      'user_id': this.userId,
      'post_id': postId,
      'token': this.token
    };
    this.userService.getComment(data).subscribe((response) => {
      this.showcomment = true;
      this.showcomments = true;
      this.indexs = indexs;
      var len = response.data.length;
      if (len > 0) {
        for (var comment = 0; comment < len; comment++) {
          this.allcomments[comment] = response.data[comment];
        }
      }
      else {
        this.allcomments = [];
      }
    })
  }

  public getcomment(comment_id) {
    let data = {
      'comment_id': comment_id,
      'token': this.token
    };
    this.userService.commentget(data).subscribe((response) => {
      this.commentid = comment_id;
      this.commentedit = response.data.comment;
      this.editshow = true;

    })
  }

  editcomment(event, comment_id, postId, indexs) {
    this.comment = event.target.value.trim();
    if(this.comment != "")
    {
    let data = {
      'comment_id': comment_id,
      'comment': this.comment,
      'token': this.token
    }
    this.userService.commentedit(data).subscribe((response) => {
      this.editshow = false;
    });
    this.allComment(postId, indexs);
  }
  else
  {
    return false;
  }
  }

  deletecomment(comment_id, postId, indexs) {
    let data = {
      'comment_id': comment_id,
      'token': this.token
    }
    this.userService.commentdelete(data).subscribe((response) => {
      this.allComment(postId, indexs);
      console.log("comment deleted.");
    })
  }

  getreplycomment(comment_id) {
    let data = {
      'comment_id': comment_id,
      'token': this.token
    };
    this.userService.commentreplyget(data).subscribe((response) => {
      console.log("Get comment by id", response.data.replycomment);
      var len = response.data.length;
      for (var comment = 0; comment < len; comment++) {
        this.commentreply[comment] = response.data[comment].replycomment;
      }
      this.comment_id = comment_id;
      this.commentshow = true;
      this.commentsshow = false;
    })
  }

  replycomment(event, comment_id, postId) {
    this.replyComment = event.target.value.trim();
    if(this.replyComment != "")
    {
    let data = {
      'comment_id': comment_id,
      'user_id': this.userId,
      'post_id': postId,
      'replycomment': this.replyComment,
      'token': this.token
    };
    this.userService.commentreply(data).subscribe((response) => {
      console.log("reply comment.", response);
      this.reply(comment_id);
      this.replyComment = event.target.value = '';
    });
  }
  else
  {
    return false;
  }
  }

  reply(commentid) {
   
    console.log("comment id===>", commentid);
    console.log("check comment id id ===>", commentid);
    let data = {
      'comment_id': commentid,
      'token': this.token
    }
    this.userService.getreplycomment(data).subscribe((response) => {
      this.commentsreply = [];
      console.log("Get comment by id", response);
      var len = response.data.length;
      for (var comment = 0; comment < len; comment++) {
        this.commentsreply[comment] = response.data[comment];
        console.log("reply comment ===>", this.commentsreply[comment]);
      }
      this.comment_id = commentid;
      this.commentsshow = true;
      this.commentshow = false;
    });
  }

  savepost(postId) {
    let data = {
      'user_id': this.userId,
      'post_id': postId,
      'token': this.token
    };
    this.userService.postsave(data).subscribe((response) => {
       this._alert.create(response.type, response.message);
    })
  }

  editPost(postId) {
    //console.log(postId);
    this.route.navigate(['editMedia', postId]);
  }

  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
  }


}

