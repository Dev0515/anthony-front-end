import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  userId: String;
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


  constructor(private globalService: GlobalService, private userService: UserService, private route: Router) { }

  public carouselOne: NgxCarousel;

  ngOnInit() {
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
    let data = { 'user_id': this.userId, 'token': this.token };
   this.userService.medialist(data).subscribe((response) => {
       for (var media = 0; media < response.data.length; media++) {
        this.posts[media] = [];
        this.posts[media]['name'] = response.name;
        this.posts[media]['id'] = response.postId[media];
        this.posts[media]['likes'] = response.count[media];
        this.posts[media]['index'] = media;
        this.posts[media]['user_id'] = response.user_id[media];
        this.posts[media]['currentuser'] = this.userId;
       for (var post = 0; post < response.data[media].length; post++) {  
         this.posts[media][post] = [];
          var ext = response.data[media][post].split(".").pop();     //To check extension of mediafiles
          if (ext == 'mov' || ext == 'mp4' || ext == 'mkv' || ext == 'avi' || ext == 'webm') {
            this.posts[media][post]['post'] = response.data[media][post];
            this.posts[media][post]['type'] = 'video';
          } else if (ext == 'gif' || ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
            this.posts[media][post]['post'] = response.data[media][post];
            this.posts[media][post]['type'] = 'image';
          }
        }
        
      }
    });
  
 
  }


  like(post, userId, index) {
    let data = {
      'user_id': userId,
      'post_id': post,
      'token': this.token
    };
    this.userService.likes(data).subscribe((response) => {
      this.index = index;
      this.countlike = response.likes;
      console.log('user likes', response);

    });
  }

  postComment(event, postId, index) {
    this.comments = event.target.value;
    let data = {
      'user_id': this.userId,
      'post_id': postId,
      'comment': this.comments,
      'token': this.token

    }
    this.userService.commentPost(data).subscribe((response) => {
      console.log("response from comment post api", response);

    })
    this.allComment(postId, index);
    this.comments = event.target.value = '';
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
      //console.log("get comment of all from all comments ==>",response.data);
      var len = response.data.length;
      for (var comment = 0; comment < len; comment++) {
        this.allcomments[comment] = response.data[comment];
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
    this.comment = event.target.value;
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
    this.replyComment = event.target.value;
    let data = {
      'comment_id': comment_id,
      'user_id': this.userId,
      'post_id': postId,
      'replycomment': this.replyComment,
      'token': this.token
    };
    this.userService.commentreply(data).subscribe((response) => {
      console.log("reply comment.", response);
      this.replyComment = event.target.value = '';
    });
    this.getreplycomment(comment_id);
  }

  reply(commentid) {
    console.log("comment id===>", commentid);
    console.log("check comment id id ===>", commentid);
    let data = {
      'comment_id': commentid,
      'token': this.token
    }
    this.userService.getreplycomment(data).subscribe((response) => {
      console.log("Get comment by id", response);
      var len = response.data.length;
      for (var comment = 0; comment < len; comment++) {
        this.commentsreply[comment] = response.data[comment].replycomment;
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
      console.log("post is saved.");
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

