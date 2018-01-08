import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WasteMetricCs } from './waste-metric-cs.model';
import { WasteMetricCsPopupService } from './waste-metric-cs-popup.service';
import { WasteMetricCsService } from './waste-metric-cs.service';

@Component({
    selector: 'jhi-waste-metric-cs-dialog',
    templateUrl: './waste-metric-cs-dialog.component.html'
})
export class WasteMetricCsDialogComponent implements OnInit {

    wasteMetric: WasteMetricCs;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private wasteMetricService: WasteMetricCsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.wasteMetric.id !== undefined) {
            this.subscribeToSaveResponse(
                this.wasteMetricService.update(this.wasteMetric));
        } else {
            this.subscribeToSaveResponse(
                this.wasteMetricService.create(this.wasteMetric));
        }
    }

    private subscribeToSaveResponse(result: Observable<WasteMetricCs>) {
        result.subscribe((res: WasteMetricCs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: WasteMetricCs) {
        this.eventManager.broadcast({ name: 'wasteMetricListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-waste-metric-cs-popup',
    template: ''
})
export class WasteMetricCsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private wasteMetricPopupService: WasteMetricCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.wasteMetricPopupService
                    .open(WasteMetricCsDialogComponent as Component, params['id']);
            } else {
                this.wasteMetricPopupService
                    .open(WasteMetricCsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
