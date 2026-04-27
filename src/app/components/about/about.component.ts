import { Component } from '@angular/core';
import { profile, Profile, Project, Skill } from '../../models/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  profile: Profile = profile;

  constructor(private router: Router) {}

  get skillCategories(): string[] {
    return [...new Set(this.profile.skills.map((s) => s.category))];
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.profile.skills.filter((s) => s.category === category);
  }

  getSkillDots(level: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < level ? 1 : 0));
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profile.photo = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  triggerPhotoInput(): void {
    document.getElementById('photoInput')?.click();
  }

  protected backHomePage(): void {
    window.location.href = '/';
  }

  goToProjectDetail(project: Project): void {
    this.router.navigate(['/projects', project.name]);
  }
}
