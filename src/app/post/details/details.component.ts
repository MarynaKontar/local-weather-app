import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../users/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id;
  user;
  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.params.
              subscribe(params => {
                    console.log(params);
                    this.id = params.id; } );
  }

  ngOnInit() {
  this.userService.getUser(this.id).
              subscribe(data => {
                     console.log(data);
                     this.user = data;
  });
  }
}
