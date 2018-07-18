import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CurrentWeatherComponent} from './current-weather/current-weather.component';
import {PostsComponent} from './post/posts/posts.component';
import {DetailsComponent} from './post/details/details.component';
import {UsersComponent} from './post/users/users.component';

const routes: Routes = [

  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'weather',
    component: CurrentWeatherComponent
  },
  {
    path: 'posts',
  component: PostsComponent
  },
  {
    path: 'details/:id',
  component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
