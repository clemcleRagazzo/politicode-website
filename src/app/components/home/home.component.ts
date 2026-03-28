import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  animateSkills = false;

  skills = [
    { name: 'Angular', level: 88 },
    { name: 'TypeScript', level: 85 },
    { name: 'HTML / CSS', level: 92 },
    { name: 'SCSS', level: 80 },
    { name: 'Git / GitHub', level: 78 },
    { name: 'CI/CD', level: 70 },
    { name: 'Figma', level: 65 },
    { name: 'Node.js', level: 60 },
  ];

  values = [
    {
      title: 'Autodidacte',
      desc: "J'apprends en faisant. Chaque projet m'apporte de nouvelles compétences que j'applique immédiatement.",
    },
    {
      title: 'Réactif',
      desc: 'Délais tenus, réponses rapides, livraison en 10 jours. Vous avez un interlocuteur unique de A à Z.',
    },
    {
      title: 'Passionné',
      desc: "Le code c'est plus qu'un métier — c'est ce que je fais le soir par plaisir. Cette énergie se ressent dans chaque projet.",
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => (this.animateSkills = true), 600);
  }
}
