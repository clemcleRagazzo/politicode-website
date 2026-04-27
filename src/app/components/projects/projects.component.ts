import { Component, Input } from '@angular/core';
import { profile, Project } from '../../models/profile';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  @Input() project: Project | null = null;
  projects: Project[] = profile.projects;
  activeFilter: string = 'all';
  selectedProject: Project | null = null;
  selectedPhotoIndex: number = 0;
  filters: string[] = [];
  ngOnInit(): void {
    const allStatuses = this.projects.map((p) => p.status);
    this.filters = ['all', ...new Set(allStatuses)];
  }
  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter((p) => p.status === this.activeFilter);
  }
  setFilter(filter: string): void {
    this.activeFilter = filter;
  }
  openModal(project: Project): void {
    this.selectedProject = project;
    this.selectedPhotoIndex = 0;
    document.body.style.overflow = 'hidden';
  }
  closeModal(): void {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }
  prevPhoto(): void {
    if (!this.selectedProject) return;
    const len = this.selectedProject.photos.length;
    this.selectedPhotoIndex = (this.selectedPhotoIndex - 1 + len) % len;
  }
  nextPhoto(): void {
    if (!this.selectedProject) return;
    const len = this.selectedProject.photos.length;
    this.selectedPhotoIndex = (this.selectedPhotoIndex + 1) % len;
  }
  setPhoto(index: number): void {
    this.selectedPhotoIndex = index;
  }
  getStatusClass(status: string): string {
    const s = status.toLowerCase();
    if (s.includes('prod') || s.includes('live') || s.includes('terminé'))
      return 'status-live';
    if (s.includes('progress') || s.includes('cours')) return 'status-progress';
    if (s.includes('pause') || s.includes('archive')) return 'status-paused';
    return 'status-default';
  }
  openLink(url: string, event: Event): void {
    event.stopPropagation();
    window.open(url, '_blank');
  }
}
