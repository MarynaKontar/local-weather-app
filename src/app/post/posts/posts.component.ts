import {Component, OnInit} from '@angular/core';
import {PostService} from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts()
      .subscribe(data => {
        console.log(data);
        this.posts = data;
      });
  }

}
