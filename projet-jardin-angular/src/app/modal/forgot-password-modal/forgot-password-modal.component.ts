import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailService } from '../../service/email.service';
import { EmailRequest } from '../../model/email-request';
import { ClientService } from '../../service/client.service';
import { Client } from '../../model/client';

@Component({
  selector: 'app-forgot-password-modal',
  standalone: false,
  templateUrl: './forgot-password-modal.component.html',
  styleUrl: './forgot-password-modal.component.css'
})
export class ForgotPasswordModalComponent {
  step: number = 1;
  login: string = '';
  client: Client = new Client('', '', '', '', 0, '');
  code: string = '';
  verificationCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  error: string = '';
  loading: boolean = false;
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient, private emailService: EmailService, private clientService: ClientService) { }

  generateCode(length: number = 6): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  sendCode() {
    this.loading = true;
    this.verificationCode = this.generateCode();

    this.clientService.findByLogin(this.login).subscribe({
      next: (client) => {
        this.client = client;
        console.log(client);

        const emailPayload = new EmailRequest(this.client.email, "Code de réinitialisation de mot de passe", `Bonjour,\n\nVoici votre code de vérification : ${this.verificationCode}\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez ce message.`);

        this.emailService.sendEmail(emailPayload).subscribe({
          next: (message) => {
            this.step = 2;
            this.error = '';
            this.loading = false;
            console.log('Réponse texte:', message);
          },
          error: (err) => {
            console.log(err);
            this.error = "Échec de l'envoi de l'email.";
            this.loading = false;

          }
        });
      },
      error: (err) => {
        console.log(err);
        this.error = "Compte introuvable";
        this.loading = false;
      }
    });

  }

  verifyCode() {
    if (this.code.trim().toUpperCase() === this.verificationCode) {
      this.step = 3;
      this.error = '';
    } else {
      this.error = "Code incorrect.";
    }
  }

  resetPassword() {
    if (!this.newPassword || this.newPassword.trim() === '') {
      this.error = `Le mot de passe est vide !`;
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas.";
      return;
    }

    let clientModif: Client = this.client;
    clientModif.password = this.newPassword;

    this.loading = true;
    this.clientService.save(clientModif).subscribe({
      next: () => {
        this.error = 'Mot de passe réinitialisé avec succès.';
        setTimeout(() => this.fermer(), 1500);
        this.loading = false;
      },
      error: () => {
        this.error = "Erreur lors de la réinitialisation.";
        this.loading = false;
      }
    });

  }

  ouvrir() {
    this.isOpen = true;
    this.isOpenChange.emit(this.isOpen);
  }

  fermer() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.reset();
  }

  reset() {
    this.step = 1;
    this.client = new Client('', '', '', '', 0, '');
    this.code = '';
    this.login = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.error = '';
  }

}
