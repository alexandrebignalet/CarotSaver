import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MenuCs } from './menu-cs.model';
import { MenuCsPopupService } from './menu-cs-popup.service';
import { MenuCsService } from './menu-cs.service';
import { WasteMetricCs, WasteMetricCsService } from '../waste-metric';
import { MealCs, MealCsService } from '../meal';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-menu-cs-dialog',
    templateUrl: './menu-cs-dialog.component.html'
})
export class MenuCsDialogComponent implements OnInit {

    menu: MenuCs;
    isSaving: boolean;

    wastemetrics: WasteMetricCs[];

    meals: MealCs[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private menuService: MenuCsService,
        private wasteMetricService: WasteMetricCsService,
        private mealService: MealCsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.wasteMetricService
            .query({filter: 'menu-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.menu.wasteMetric || !this.menu.wasteMetric.id) {
                    this.wastemetrics = res.json;
                } else {
                    this.wasteMetricService
                        .find(this.menu.wasteMetric.id)
                        .subscribe((subRes: WasteMetricCs) => {
                            this.wastemetrics = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.mealService.query()
            .subscribe((res: ResponseWrapper) => { this.meals = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.menu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.menuService.update(this.menu));
        } else {
            this.subscribeToSaveResponse(
                this.menuService.create(this.menu));
        }
    }

    private subscribeToSaveResponse(result: Observable<MenuCs>) {
        result.subscribe((res: MenuCs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MenuCs) {
        this.eventManager.broadcast({ name: 'menuListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackWasteMetricById(index: number, item: WasteMetricCs) {
        return item.id;
    }

    trackMealById(index: number, item: MealCs) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-menu-cs-popup',
    template: ''
})
export class MenuCsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private menuPopupService: MenuCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.menuPopupService
                    .open(MenuCsDialogComponent as Component, params['id']);
            } else {
                this.menuPopupService
                    .open(MenuCsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
