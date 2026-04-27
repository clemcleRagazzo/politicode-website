import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, profile, Profile } from '../../../models/profile';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  // @Input() project!: Project;

  // Get id from URL using ActivatedRoute

  @Input() project!: Project;
  profile: Profile = profile;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');

    this.project =
      this.profile.projects.filter((p) => p.name === name)[0] ?? null;
  }

  detailOpen = false;
  photoIndex = 0;

  get statusClass(): string {
    const s = (this.project?.status ?? '').toLowerCase();
    if (s.includes('prod') || s.includes('live') || s.includes('terminé'))
      return 'status-live';
    if (s.includes('cours') || s.includes('progress')) return 'status-progress';
    if (s.includes('pause') || s.includes('archiv')) return 'status-paused';
    return 'status-default';
  }

  open(): void {
    this.detailOpen = true;
    this.photoIndex = 0;
  }

  close(): void {
    this.detailOpen = false;
  }

  prevPhoto(): void {
    const len = this.project.photos.length;
    this.photoIndex = (this.photoIndex - 1 + len) % len;
  }

  nextPhoto(): void {
    this.photoIndex = (this.photoIndex + 1) % this.project.photos.length;
  }

  setPhoto(i: number): void {
    this.photoIndex = i;
  }
}
