import {Routes} from '@angular/router';
import {Home} from '../features/home/home';
import {UserList} from '../features/users/user-list/user-list';
import {UserDetail} from '../features/users/user-detail/user-detail';
import {Lists} from '../features/lists/lists';
import {Messages} from '../features/messages/messages';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'users', component: UserList},
  {path: 'users/:id', component: UserDetail},
  {path: 'lists', component: Lists},
  {path: 'messages', component: Messages},
  {path: '**', component: Home},
];
