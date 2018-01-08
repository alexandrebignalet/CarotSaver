/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { CarotSaverTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DishServeCsDetailComponent } from '../../../../../../main/webapp/app/entities/dish-serve/dish-serve-cs-detail.component';
import { DishServeCsService } from '../../../../../../main/webapp/app/entities/dish-serve/dish-serve-cs.service';
import { DishServeCs } from '../../../../../../main/webapp/app/entities/dish-serve/dish-serve-cs.model';

describe('Component Tests', () => {

    describe('DishServeCs Management Detail Component', () => {
        let comp: DishServeCsDetailComponent;
        let fixture: ComponentFixture<DishServeCsDetailComponent>;
        let service: DishServeCsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CarotSaverTestModule],
                declarations: [DishServeCsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DishServeCsService,
                    JhiEventManager
                ]
            }).overrideTemplate(DishServeCsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DishServeCsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DishServeCsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DishServeCs(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dishServe).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
