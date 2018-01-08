import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DishServeCs } from './dish-serve-cs.model';
import { DishServeCsPopupService } from './dish-serve-cs-popup.service';
import { DishServeCsService } from './dish-serve-cs.service';
import { MenuCs, MenuCsService } from '../menu';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dish-serve-cs-dialog',
    templateUrl: './dish-serve-cs-dialog.component.html'
})
export class DishServeCsDialogComponent implements OnInit {

    dishServe: DishServeCs;
    isSaving: boolean;

    menus: MenuCs[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dishServeService: DishServeCsService,
        private menuService: MenuCsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.menuService
            .query({filter: 'dishserve-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.dishServe.menu || !this.dishServe.menu.id) {
                    this.menus = res.json;
                } else {
                    this.menuService
                        .find(this.dishServe.menu.id)
                        .subscribe((subRes: MenuCs) => {
                            this.menus = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dishServe.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dishServeService.update(this.dishServe));
        } else {
            this.subscribeToSaveResponse(
                this.dishServeService.create(this.dishServe));
        }
    }

    private subscribeToSaveResponse(result: Observable<DishServeCs>) {
        result.subscribe((res: DishServeCs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DishServeCs) {
        this.eventManager.broadcast({ name: 'dishServeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMenuById(index: number, item: MenuCs) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dish-serve-cs-popup',
    template: ''
})
export class DishServeCsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dishServePopupService: DishServeCsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dishServePopupService
                    .open(DishServeCsDialogComponent as Component, params['id']);
            } else {
                this.dishServePopupService
                    .open(DishServeCsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
