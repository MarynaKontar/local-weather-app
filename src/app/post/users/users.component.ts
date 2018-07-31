import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
// ANIMATION
// We start off by defining an animation by giving it a trigger with a name listStagger.
// Next, we use transition to define when the animations will take place, from one animation state to the other.
// A wildcard ('* <=> *') is used to say from any state to any state, in this case.
// Then, we use query to say that on :enter, we apply an initial style that's hidden and moved on the Y axis by -15px,
// and make a stagger animation for each sequential element.
// At the end, we define an optional :leave animation.
  // To make this work, visit the /src/app/users/users.component.html file and reference the animation trigger: <ul [@listStagger]="users">
export class UsersComponent implements OnInit {

  users;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(data => {console.log(data);
      this.users = data});
  }

}
