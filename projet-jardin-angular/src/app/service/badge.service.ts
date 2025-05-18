import { Injectable } from '@angular/core';
import { Badge } from '../model/badge';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor() { }

  private storageKey(login: string): string {
    return `userBadges_${login}`;
  }

  getStoredBadges(login: string): Badge[] {
    const raw = localStorage.getItem(this.storageKey(login));
    return raw ? (JSON.parse(raw) as Badge[]) : [];
  }

  storeBadges(login: string, badges: Badge[]): void {
    localStorage.setItem(this.storageKey(login), JSON.stringify(badges));
  }

  getNewlyUnlocked(current: Badge[], previous: Badge[]): Badge[] {
    return current.filter(b => !previous.includes(b));
  }

  clearStoredBadges(login: string): void {
    localStorage.removeItem(this.storageKey(login));
  }

  getBadgesForScore(score: number): Badge[] {
    return Object.values(Badge)
      .filter(value => typeof value === 'number' && score >= value) as Badge[];
  }
}
