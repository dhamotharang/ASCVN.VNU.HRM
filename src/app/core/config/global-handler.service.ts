import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        if (!environment.production) {
            console.error(error);
        }
        
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;

        if (chunkFailedMessage.test(error.message)) {
            window.location.reload(true);
        }
    }
}
