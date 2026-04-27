import { Component } from '@angular/core';
import { profile, Profile } from '../../models/profile';

@Component({
  selector: 'app-header-bar',
  imports: [],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.css',
})
export class HeaderBarComponent {
  profile: Profile = profile;
}
