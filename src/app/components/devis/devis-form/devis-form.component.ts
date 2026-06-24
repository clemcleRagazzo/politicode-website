import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { profile, Profile } from '../../../models/profile';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { DevisService } from '../../../services/devis.service';

@Component({
  selector: 'app-devis-form',
  imports: [ReactiveFormsModule, UpperCasePipe, CommonModule],
  templateUrl: './devis-form.component.html',
  styleUrl: './devis-form.component.css',
})
export class DevisFormComponent implements OnInit {
  devisForm!: FormGroup;
  profile: Profile = profile;
  submitted = false;
  mailSent = false;

  success = false;
  loading = false;
  erreur = '';

  constructor(
    private fb: FormBuilder,
    private devisService: DevisService,
  ) {}

  ngOnInit(): void {
    this.devisForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      job: ['', [Validators.required, Validators.minLength(2)]],
      mail: ['', [Validators.required, Validators.email]],
      numberPhone: ['', [Validators.pattern(/^[0-9+\s\-()]{7,15}$/)]],
      projectName: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      delay: [null, [Validators.min(1), Validators.max(120)]],
    });
  }
  // Raccourcis pour le template
  get f() {
    return this.devisForm.controls;
  }
  isInvalid(field: string): boolean {
    const ctrl = this.devisForm.get(field);
    return !!(
      ctrl &&
      ctrl.invalid &&
      (ctrl.dirty || ctrl.touched || this.submitted)
    );
  }
  getError(field: string): string {
    const ctrl = this.devisForm.get(field);
    if (!ctrl || !ctrl.errors) return '';
    if (ctrl.errors['required']) return 'Ce champ est obligatoire.';
    if (ctrl.errors['email']) return 'Adresse email invalide.';
    if (ctrl.errors['minlength']) {
      const min = ctrl.errors['minlength'].requiredLength;
      return `Minimum ${min} caractères.`;
    }
    if (ctrl.errors['pattern']) return 'Numéro de téléphone invalide.';
    if (ctrl.errors['min']) return 'Le délai doit être au moins 1 mois.';
    if (ctrl.errors['max']) return 'Le délai ne peut pas dépasser 120 mois.';
    return 'Valeur incorrecte.';
  }

  protected onSubmit(): void {
    this.submitted = true;
    if (this.devisForm.invalid) return;

    // this.sendMail();
    this.sendForm();

    this.mailSent = true;
  }

  private sendMail() {
    const v = this.devisForm.value;

    // Construire le corps du mail avec des sauts de ligne
    let body = `Bonjour ${this.profile.firstName || ''} ${this.profile.lastName || ''},\n\n`;
    body += `Je souhaiterais prendre contact avec vous afin de réaliser le projet suivant :\n`;

    if (v.projectName) body += `- Projet : ${v.projectName}\n`;
    if (v.description) body += `- Description : ${v.description}\n`;
    if (v.delay) body += `- Délai souhaité : ${v.delay} jours\n`;

    body += `\nVous pouvez me contacter aux coordonnées suivantes :\n`;
    if (v.mail) body += `- Email : ${v.mail}\n`;
    if (v.numberPhone) body += `- Téléphone : ${v.numberPhone}\n`;

    body += `\nCordialement,\n`;
    body += `${(v.lastName || '').toUpperCase()} ${v.firstName || ''}`;
    if (v.job) body += ` - ${v.job}`;

    const subject = encodeURIComponent(
      `Demande de devis — ${v.firstName || ''} ${v.lastName || ''}`,
    );
    const bodyEncoded = encodeURIComponent(body);

    const mailto = `mailto:${this.profile.email || ''}?subject=${subject}&body=${bodyEncoded}`;
    window.open(mailto, '_blank');
  }

  private sendForm(): void {
    if (this.devisForm.invalid) return;

    this.loading = true;
    this.erreur = '';

    this.devisService.envoyerDevis(this.devisForm.value).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        this.devisForm.reset();
      },
      error: (err) => {
        this.erreur = 'Une erreur est survenue, réessaie.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  reset(): void {
    this.devisForm.reset();
    this.submitted = false;
    this.mailSent = false;
  }
}
