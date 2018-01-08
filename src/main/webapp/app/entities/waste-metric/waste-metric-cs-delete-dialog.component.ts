import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WasteMetricCs } from './waste-metric-cs.model';
import { WasteMetricCsPopupService } from './waste-metric-cs-popup.service';
import { WasteMetricCsService } from './waste-metric-cs.service';

@Component({
    selector: 'jhi-waste-metric-cs-delete-dialog',
    templateUrl: './waste-metric-cs-delete-dialog.component.html'
})
export class WasteMetricCsDeleteDialogComponent {

    wasteMetric: WasteMetricCs;

    constructor(
        private wasteMetricService: WasteMetricCsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.wasteMetricService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'wasteMetricListModification',
                content: 'Deleted an wasteMetric'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-waste-metric-cs-delete-popup',
    template: ''
})
export class WasteMetricCsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private wasteMetricPopupService: WasteMetricCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.wasteMetricPopupService
                .open(WasteMetricCsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
