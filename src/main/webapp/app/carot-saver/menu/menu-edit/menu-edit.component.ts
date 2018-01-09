import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import {MenuCs} from "../../../entities/menu/menu-cs.model";
import {MenuCsService} from "../../../entities/menu/menu-cs.service";
import { ITEMS_PER_PAGE, Principal, ResponseWrapper, Account, LoginModalService } from '../../../shared';
import {DishCsService} from "../../../entities/dish/dish-cs.service";
import {DishCs} from "../../../entities/dish/dish-cs.model";

@Component({
    selector: 'jhi-home',
    templateUrl: './menu-edit.component.html',
    styleUrls: [
        '../menu.scss'
    ]

})
export class MenuEditComponent implements OnInit, OnDestroy, OnChanges {
    currentAccount: any;
    eventSubscriber: Subscription;
    dishes: DishCs[];
    desserts: DishCs[];
    principals: DishCs[];
    entrees: DishCs[];

    selectedEntree: DishCs;

    constructor(
        private menuService: MenuCsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private dishService: DishCsService,
    ) {
        this.selectedEntree = {};
    }

    ngOnInit() {
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

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
        console.log(changes);
    }


    trackId(index: number, item: MenuCs) {
        return item.id;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private parseData(data) {
        this.entrees = data.filter( item => item.type == 'ENTREE');
        this.principals = data.filter( item => item.type == 'PRINCIPAL');
        this.desserts = data.filter( item => item.type == 'DESSERT');

        console.log(this.desserts);
        console.log(this.principals);
        console.log(this.entrees);
    }
}
