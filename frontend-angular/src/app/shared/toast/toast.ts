import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-toast',
  imports: [
    ButtonModule,
    ToastModule,
    RippleModule
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
    private messageService = inject(MessageService);

    showSuccessDelete() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully' });
      }
    
    
    
      showErrorDelete() {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete product' });
      }


}
