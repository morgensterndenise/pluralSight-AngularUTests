import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

//Routing component: When we test them we need to test if we are interacting correctly with the framework and 
// if Routing component is configured correctly or called correctly
//and NOT if they are doing correcty their job and NOT to test the framework
describe('HeroDetailComponent', () => {
     
    let fixture: ComponentFixture<HeroDetailComponent>;
    //we will mock the 3 services needed for HeroDetailComponent
    let mockActivatedRoute, mockHeroService, mockLocation;
    
    //we create mock obj for the snapshot as we just need hollow methods to avoid error and not real implementation
      mockActivatedRoute = {
        snapshot: {paramMap: {get: () => {return '3';}}}
    }

     beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
   
        //here we should write import Location import { Location } from "@angular/common"; as we have global Location and ang won't propose it for import 
       TestBed.configureTestingModule({
         declarations: [HeroDetailComponent],
         imports: [FormsModule],
         providers: [
             {provide: ActivatedRoute, useValue: mockActivatedRoute},
             {provide: HeroService, useValue: mockHeroService},
             {provide: Location, useValue: mockLocation}
         ]
       });
      
       fixture = TestBed.createComponent(HeroDetailComponent);
       //of gives us observable
       mockHeroService.getHero.and.returnValue(of({
           id:3, name: 'Superman', strength:3
       }));
        
     });

     // check if hero name is rendered correctly
     it('should render hero name in a h2 tag', () => {
     //1. we need to import ngModel (that comes from forms) in the import section of testbed configuration as the label input use it
    //to trigger binding
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERMAN');
    })
});