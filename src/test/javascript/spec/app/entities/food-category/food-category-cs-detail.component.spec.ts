/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { CarotSaverTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FoodCategoryCsDetailComponent } from '../../../../../../main/webapp/app/entities/food-category/food-category-cs-detail.component';
import { FoodCategoryCsService } from '../../../../../../main/webapp/app/entities/food-category/food-category-cs.service';
import { FoodCategoryCs } from '../../../../../../main/webapp/app/entities/food-category/food-category-cs.model';

describe('Component Tests', () => {

    describe('FoodCategoryCs Management Detail Component', () => {
        let comp: FoodCategoryCsDetailComponent;
        let fixture: ComponentFixture<FoodCategoryCsDetailComponent>;
        let service: FoodCategoryCsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CarotSaverTestModule],
                declarations: [FoodCategoryCsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FoodCategoryCsService,
                    JhiEventManager
                ]
            }).overrideTemplate(FoodCategoryCsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FoodCategoryCsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FoodCategoryCsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FoodCategoryCs(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.foodCategory).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
