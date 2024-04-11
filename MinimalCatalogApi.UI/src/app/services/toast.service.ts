import { Injectable } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: NgbToast[] = [];

  show(message: string, options: any = {}): NgbToast {
    const toast: NgbToast = { header: options.header, body: message, ...options };
    console.log(toast);
    this.toasts.push(toast);
    return toast;
  }

  remove(toast: NgbToast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
