import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import {MenuCs} from "../../../entities/menu/menu-cs.model";
import {MenuCsService} from "../../../entities/menu/menu-cs.service";
import { ITEMS_PER_PAGE, Principal, ResponseWrapper, Account, LoginModalService } from '../../../shared';
import {DishCsService} from "../../../entities/dish/dish-cs.service";
import {DishCs} from "../../../entities/dish/dish-cs.model";
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
    selector: 'jhi-home',
    templateUrl: './menu-edit.component.html',
    styleUrls: [
        '../menu.scss'
    ]

})
export class MenuEditComponent implements OnInit, OnDestroy {
    currentAccount: any;
    eventSubscriber: Subscription;
    isSaving: boolean;

    dishes: DishCs[];
    desserts: DishCs[];
    principals: DishCs[];
    entrees: DishCs[];

    selectedEntree: any;
    selectedPrincipal: any;
    selectedDessert: any;

    menu: MenuCs;

    constructor(
        private menuService: MenuCsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private dishService: DishCsService,
        private router: Router
    ) {
        this.menu = {};
        this.selectedEntree = {};
        this.selectedPrincipal = {};
        this.selectedDessert = {};
    }

    ngOnInit() {
        this.isSaving = false;
        this.dishService.query()
            .subscribe((res: ResponseWrapper) => {
                this.dishes = res.json;
                this.parseData(res.json)
            }, (res: ResponseWrapper) => this.onError(res.json));

        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {
        //this.eventManager.destroy(this.eventSubscriber);
    }


    onSubmit() {
        this.menu.dishes = [
            this.dishes.filter( item => item.id == this.selectedEntree)[0],
            this.dishes.filter( item => item.id == this.selectedPrincipal)[0],
            this.dishes.filter( item => item.id == this.selectedDessert)[0],
        ];

        console.log(this.menu);
        this.save();
    }

    save() {
        if (this.menu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.menuService.update(this.menu));
        } else {
            this.subscribeToSaveResponse(
                this.menuService.create(this.menu));
        }
    }

    private onSaveSuccess(result: MenuCs) {
        this.eventManager.broadcast({ name: 'menuListModification', content: 'OK'});
        this.isSaving = false;
        this.router.navigate(['/carot-saver-menu'])
    }

    private subscribeToSaveResponse(result: Observable<MenuCs>) {
        result.subscribe((res: MenuCs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackId(index: number, item: MenuCs) {
        return item.id;
    }


    private parseData(data) {
        this.entrees = data.filter( item => item.type == 'ENTREE');
        this.principals = data.filter( item => item.type == 'PRINCIPAL');
        this.desserts = data.filter( item => item.type == 'DESSERT');

        this.selectedEntree = this.entrees[0].id;
        this.selectedPrincipal = this.principals[0].id;
        this.selectedDessert = this.desserts[0].id;
    }
}
