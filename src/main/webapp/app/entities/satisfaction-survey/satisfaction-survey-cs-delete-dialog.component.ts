import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SatisfactionSurveyCs } from './satisfaction-survey-cs.model';
import { SatisfactionSurveyCsPopupService } from './satisfaction-survey-cs-popup.service';
import { SatisfactionSurveyCsService } from './satisfaction-survey-cs.service';

@Component({
    selector: 'jhi-satisfaction-survey-cs-delete-dialog',
    templateUrl: './satisfaction-survey-cs-delete-dialog.component.html'
})
export class SatisfactionSurveyCsDeleteDialogComponent {

    satisfactionSurvey: SatisfactionSurveyCs;

    constructor(
        private satisfactionSurveyService: SatisfactionSurveyCsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.satisfactionSurveyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'satisfactionSurveyListModification',
                content: 'Deleted an satisfactionSurvey'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-satisfaction-survey-cs-delete-popup',
    template: ''
})
export class SatisfactionSurveyCsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private satisfactionSurveyPopupService: SatisfactionSurveyCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.satisfactionSurveyPopupService
                .open(SatisfactionSurveyCsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
