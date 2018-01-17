import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import {MenuCs} from "../../entities/menu/menu-cs.model";
import { ITEMS_PER_PAGE, Principal, ResponseWrapper, Account, LoginModalService } from '../../shared';
import {Router} from '@angular/router';
import {MealCsService} from "../../entities/meal/meal-cs.service";
import {MenuEditComponent} from "../menu/menu-edit/menu-edit.component";
import {MenuCsService} from "../../entities/menu/menu-cs.service";
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {WasteMetricCs} from "../../entities/waste-metric/waste-metric-cs.model";
import {WasteMetricCsService} from "../../entities/waste-metric/waste-metric-cs.service";

@Component({
    selector: 'meal-component',
    templateUrl: './meal.component.html',
    styleUrls: [
        'meal.scss'
    ]

})
export class MealComponent implements OnInit, OnDestroy {

    meals: any;
    meal: any;
    currentAccount: any;
    selectedDate: any;
    eventSubscriber: Subscription;

    constructor(
        private mealService: MealCsService,
        private menuService: MenuCsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private wasteMetricService: WasteMetricCsService
    ) {
    }


    ngOnInit() {
        this.initSelectedDate();
        this.initMeal();

        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    onDateChange($event) {
        let date = this.getFormattedDate();

        this.mealService.findByCreatedDate(date)

            .mergeMap(meal => {
                this.meal = meal;
                return this.menuService.find(meal.menu.id)
            })
            .subscribe(
                (menu) => {
                    this.meal.menu = menu;
                    console.log(this.meal);
                },
                (res: ResponseWrapper) => {
                    this.initMeal();
                    this.onError(res.json)
                }
            );

    }


    private initMeal() {
        this.meal = {
            menu: {},
            nbPresent: 0,
            wasteMetric: {
                plastic: 0,
                green: 0,
                other: 0
            }
        };
    }

    private initSelectedDate() {
        const date = new Date();
        this.selectedDate = {
            day: date.getUTCDate(),
            month: date.getUTCMonth() + 1,
            year: date.getUTCFullYear(),
        }

        console.log(this.selectedDate);
    }



    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MenuCs) {
        return item.id;
    }


    goToEdit() {
        this.router.navigate(['/carot-saver-meal-edit'])
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    onSaveMenu($event) {
        this.meal.menu = $event;
        console.log($event);
    }


    saveMeal() {
        console.log(this.meal);
        if (this.meal.wasteMetric.id !== undefined) {
            console.log('pd');
            this.wasteMetricService.update(this.meal.wasteMetric)
                .mergeMap( wm => {
                    this.meal.wasteMetric = wm;
                    if(this.meal.menu.id !== undefined) return this.menuService.update(this.meal.menu);
                    if(!this.meal.menu.id) return this.menuService.create(this.meal.menu);
                })
                .mergeMap( menu => {
                    this.meal.menu = menu;
                    if(this.meal.id !== undefined) return this.mealService.update(this.meal);
                    if(!this.meal.id) return this.mealService.create(this.meal);
                })
                .subscribe(
                    meal => console.log(meal),
                    err => console.log(err)
                )
        } else {
            console.log('pd2');
            this.wasteMetricService.create(this.meal.wasteMetric)
                .mergeMap( wm => {
                    this.meal.wasteMetric = wm;
                    if(this.meal.menu.id !== undefined) return this.menuService.update(this.meal.menu);
                    if(!this.meal.menu.id) return this.menuService.create(this.meal.menu);
                })
                .mergeMap( menu => {
                    this.meal.menu = menu;
                    if(this.meal.id !== undefined) return this.mealService.update(this.meal);
                    if(!this.meal.id) return this.mealService.create(this.meal);
                })
                .subscribe(
                    meal => console.log(meal),
                    err => console.log(err)
                )
        }
    }

    private subscribeToSaveWMResponse(result: Observable<WasteMetricCs>) {
        result.subscribe((res: WasteMetricCs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: WasteMetricCs) {
        this.eventManager.broadcast({ name: 'wasteMetricListModification', content: 'OK'});

    }

    private onSaveError() {

    }

    getFormattedDate() {

        if(this.selectedDate.day) {
            let formattedDay = this.selectedDate.day.toString().length == 1 ? '0' + this.selectedDate.day : this.selectedDate.day;
            let formattedMonth = this.selectedDate.month.toString().length == 1 ? '0' + this.selectedDate.month : this.selectedDate.month;
            let date = `${this.selectedDate.year}-${formattedMonth}-${formattedDay}`;

            return date;
        }


    }

    private parseData(data) {
        this.meals = data;
        for(let meal of data) {
           /* for(let item of meal.menu.dishes) {
                item.entree = item.dishes.filter(dish => dish.type == "ENTREE")[0];
                item.principal = item.dishes.filter(dish => dish.type == "PRINCIPAL")[0];
                item.dessert = item.dishes.filter(dish => dish.type == "DESSERT")[0];
            }*/
        }

        this.meals = data;
        console.log(data);
    }


}
