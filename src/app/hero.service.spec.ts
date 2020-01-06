import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService integration test', () => {
    let mockMessageService: MessageService; //in HeroService we inject messageService that's why we need it
    let httpTestingController:HttpTestingController;
    let service: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add', 'clear']);
       
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[
                HeroService,
               {provide: MessageService, useValue: mockMessageService} 
            ]
        })
        //get -> access the dependency injection registry and finds the service that corresponds to that
        httpTestingController = TestBed.get(HttpTestingController); //we are injecting it in the method below
        //if we need access to message service or heroservice we can take them the same way
        service = TestBed.get(HeroService); //2nd way mocking service
    });

    describe('getHero', () => {
        //Mocking a service 1st way
        //inject func used as a wrapper for our callback. Inject accept the service as 1t param i posle mu kazvame 
       //priemi tazi service kato vhoden parameter. Injectvame i controlera shtoto ni triabva
        /* it('should call get with the correct URL', inject([HeroService, HttpTestingController], 
            (service: HeroService, controller: HttpTestingController) => {
                service.getHero(4).subscribe(); //in getHero we have http call thats why we need subscribe, za da vzemem rezultata

        })); */
        it('should call get with the correct URL', () => {
           service.getHero(4).subscribe(() => {
               //this will be executed after the flush down
              
           });

           //Act
           //we must say to the testing http controller that we are expecting a call shtoto callvame api
           const request = httpTestingController.expectOne('api/heroes/4');
           //we specify what data we want this req to return
           request.flush({id:4, name: 'Superman', strength: 100});
          //verifies that we only got the call that we are expecting example the call with id:4
           httpTestingController.verify();
        });
    });
});