import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser =
      typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  setItem(key: string, value: any): void {
    if (this.isBrowser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string): any {
    if (this.isBrowser) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  }

  updateItem(key: string, value: any): void {
    if (this.isBrowser) {
      if (localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        console.error(
          `Item com chave "${key}" não encontrado no localStorage.`
        );
      }
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}
