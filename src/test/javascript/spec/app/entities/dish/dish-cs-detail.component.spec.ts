/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { CarotSaverTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DishCsDetailComponent } from '../../../../../../main/webapp/app/entities/dish/dish-cs-detail.component';
import { DishCsService } from '../../../../../../main/webapp/app/entities/dish/dish-cs.service';
import { DishCs } from '../../../../../../main/webapp/app/entities/dish/dish-cs.model';

describe('Component Tests', () => {

    describe('DishCs Management Detail Component', () => {
        let comp: DishCsDetailComponent;
        let fixture: ComponentFixture<DishCsDetailComponent>;
        let service: DishCsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CarotSaverTestModule],
                declarations: [DishCsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DishCsService,
                    JhiEventManager
                ]
            }).overrideTemplate(DishCsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DishCsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DishCsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DishCs(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dish).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
