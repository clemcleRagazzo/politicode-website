import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Profile, profile } from '../../models/profile';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit, OnDestroy {
  countdown = 0;
  private timer: any;

  profile: Profile = profile;

  // Textes qui défilent façon terminal
  terminalLines = [
    '> Initialisation du système...',
    "> Recherche d'un bon développeur...",
    '> Parcours de 1 337 répertoires...',
    '> Interrogation de la base de données...',
    '> Un résultat trouvé.',
    '> Recherche du site...',
    '> Vous y êtes déjà !',
    "> Retournez simplement à l'accueil",
  ];

  visibleLines: string[] = [];
  private lineIndex = 0;
  private lineTimer: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Défilement terminal
    this.lineTimer = setInterval(() => {
      if (this.lineIndex < this.terminalLines.length) {
        this.visibleLines.push(this.terminalLines[this.lineIndex]);
        this.lineIndex++;
      } else {
        clearInterval(this.lineTimer);
      }
    }, 600);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    clearInterval(this.lineTimer);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  getSkillDelay(i: number): string {
    return `${(i * 0.4).toFixed(1)}s`;
  }

  getSkillLeft(i: number): string {
    const positions = [
      5, 12, 20, 28, 35, 42, 50, 57, 64, 71, 78, 85, 8, 45, 68,
    ];
    return `${positions[i % positions.length]}%`;
  }

  getSkillDuration(i: number): string {
    const durations = [6, 8, 5, 9, 7, 6, 10, 5, 8, 7, 6, 9, 7, 8, 5];
    return `${durations[i % durations.length]}s`;
  }
}
