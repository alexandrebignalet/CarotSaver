import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SatisfactionSurveyCs } from './satisfaction-survey-cs.model';
import { SatisfactionSurveyCsService } from './satisfaction-survey-cs.service';

@Injectable()
export class SatisfactionSurveyCsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private satisfactionSurveyService: SatisfactionSurveyCsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.satisfactionSurveyService.find(id).subscribe((satisfactionSurvey) => {
                    this.ngbModalRef = this.satisfactionSurveyModalRef(component, satisfactionSurvey);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.satisfactionSurveyModalRef(component, new SatisfactionSurveyCs());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    satisfactionSurveyModalRef(component: Component, satisfactionSurvey: SatisfactionSurveyCs): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.satisfactionSurvey = satisfactionSurvey;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
