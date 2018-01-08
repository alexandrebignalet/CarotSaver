/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { CarotSaverTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MenuCsDetailComponent } from '../../../../../../main/webapp/app/entities/menu/menu-cs-detail.component';
import { MenuCsService } from '../../../../../../main/webapp/app/entities/menu/menu-cs.service';
import { MenuCs } from '../../../../../../main/webapp/app/entities/menu/menu-cs.model';

describe('Component Tests', () => {

    describe('MenuCs Management Detail Component', () => {
        let comp: MenuCsDetailComponent;
        let fixture: ComponentFixture<MenuCsDetailComponent>;
        let service: MenuCsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CarotSaverTestModule],
                declarations: [MenuCsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MenuCsService,
                    JhiEventManager
                ]
            }).overrideTemplate(MenuCsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MenuCsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuCsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MenuCs(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.menu).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
