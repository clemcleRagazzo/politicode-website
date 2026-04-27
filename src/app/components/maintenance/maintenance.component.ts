import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { profile } from '../../models/profile';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css',
})
export class MaintenanceComponent implements OnInit, OnDestroy {
  // Barre de progression simulée
  progress = 0;
  private progressTimer: any;

  // Tâches en cours façon CI/CD
  tasks = [
    { label: 'Sauvegarde des données', done: false, active: false },
    { label: 'Mise à jour des dépendances', done: false, active: false },
    { label: 'Migration base de données', done: false, active: false },
    { label: 'Compilation du build Angular', done: false, active: false },
    { label: 'Tests unitaires & e2e', done: false, active: false },
    { label: 'Déploiement en production', done: false, active: false },
  ];
  private taskTimer: any;
  private taskIndex = 0;

  // Logs terminal
  logs: { text: string; type: 'info' | 'success' | 'warn' | 'error' }[] = [];
  private logTimer: any;
  private logLines: {
    text: string;
    type: 'info' | 'success' | 'warn' | 'error';
  }[] = [
    { text: '> npm run build -- --configuration production', type: 'info' },
    { text: '> Compiling Angular application...', type: 'info' },
    { text: '> Running migrations 001_add_projects_table.sql', type: 'info' },
    { text: '> ✓ Migration applied successfully', type: 'success' },
    { text: '> Running 142 unit tests...', type: 'info' },
    { text: '> WARN  1 snapshot outdated', type: 'warn' },
    { text: '> ✓ All tests passed (142/142)', type: 'success' },
    { text: '> Building Docker image v2.4.1...', type: 'info' },
    { text: '> ✓ Image built in 38s', type: 'success' },
    { text: '> Pushing to registry...', type: 'info' },
    { text: '> Deploying to production server...', type: 'info' },
    { text: '> ✓ Deployment successful — ETA 2 min', type: 'success' },
  ];
  private logIndex = 0;

  // Compte à rebours estimé (mm:ss)
  estimatedSeconds: number | null = null; //8 * 60;
  private countdownTimer: any;

  get minutes(): string {
    if (this.estimatedSeconds)
      return String(Math.floor(this.estimatedSeconds / 60)).padStart(2, '0');
    return 'XX';
  }

  get seconds(): string {
    if (this.estimatedSeconds)
      return String(this.estimatedSeconds % 60).padStart(2, '0');
    return 'XX';
  }

  selectedSkill: string = '';

  private skillTimer: any;

  private updateSelectedSkill() {
    this.selectedSkill =
      profile.skills[Math.floor(Math.random() * profile.skills.length)].name;
  }

  ngOnInit(): void {
    this.updateSelectedSkill();
    this.skillTimer = setInterval(() => {
      this.updateSelectedSkill();
    }, 2500);

    // Progression
    this.progressTimer = setInterval(() => {
      if (this.progress < 72) this.progress += 0.15;
    }, 80);

    // Tâches
    this.tasks[0].active = true;
    this.taskTimer = setInterval(() => {
      if (this.taskIndex < this.tasks.length) {
        if (this.taskIndex > 0) {
          this.tasks[this.taskIndex - 1].done = true;
          this.tasks[this.taskIndex - 1].active = false;
        }
        if (this.taskIndex < this.tasks.length) {
          this.tasks[this.taskIndex].active = true;
        }
        this.taskIndex++;
      } else {
        this.tasks[this.tasks.length - 1].done = true;
        this.tasks[this.tasks.length - 1].active = false;
        clearInterval(this.taskTimer);
      }
    }, 2200);

    // Logs
    this.logTimer = setInterval(() => {
      if (this.logIndex < this.logLines.length) {
        this.logs.push(this.logLines[this.logIndex]);
        this.logIndex++;
      } else {
        clearInterval(this.logTimer);
      }
    }, 900);

    // Compte à rebours*
    if (this.estimatedSeconds != null) {
      this.countdownTimer = setInterval(() => {
        if (this.estimatedSeconds != null && this.estimatedSeconds > 0) {
          this.estimatedSeconds--;
        }
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.progressTimer);
    clearInterval(this.taskTimer);
    clearInterval(this.logTimer);
    clearInterval(this.countdownTimer);
    clearInterval(this.skillTimer);
  }
}
