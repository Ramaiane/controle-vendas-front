import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { HTTPStatus } from './HTTPStatus.service';
import { IServiceMessage } from '../../model/IServiceMessage';


@Injectable()
export class HTTPListener implements HttpInterceptor {
    constructor(
        private status: HTTPStatus,
        private messageService: MessageService,
        ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        this.status.setHttpStatus(true);
        return next.handle(req).pipe(
            map(event => {
                if (event instanceof HttpResponse && event.body && event.body.messages) {
                    this.messageService.addAll(event.body.messages.map((msg: IServiceMessage) =>
                        ({ severity: msg.type.toLowerCase(), detail: msg.message })));
                }
                return event;
            }),
            catchError(error => {
                if (error.error && error.error.messages) {
                    this.messageService.addAll(error.error.messages.map((msg: IServiceMessage) =>
                        ({ severity: msg.type.toLowerCase(), detail: msg.message })));
                }
                return throwError(error);
            }),
            finalize(() => this.status.setHttpStatus(false))
        );
    }
}
