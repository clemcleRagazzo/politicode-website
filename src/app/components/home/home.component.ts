import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { profile, Profile } from '../../models/profile';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  animateSkills = false;
  profile: Profile = profile;

  ngAfterViewInit() {
    setTimeout(() => (this.animateSkills = true), 600);
  }
}
