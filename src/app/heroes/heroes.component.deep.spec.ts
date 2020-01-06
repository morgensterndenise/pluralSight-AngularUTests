import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroComponent } from "../hero/hero.component";
import { HeroService } from "../hero.service";
import { NO_ERRORS_SCHEMA, Directive, Input } from "@angular/core";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

//fake router link directive and fake class RouterLinkDirectiveStub
@Directive({
  selector: '[routerLink]',
  host: {'(click)': 'onClick()'} //allow us to listen if a link is clicked
})
//mocking build in directives
export class RouterLinkDirectiveStub{
    //router link wants input property in it
    @Input('routerLink') linkParams: any;
    navigatedTo:any = null;

    //it is a a link 
    onClick(){
     this.navigatedTo = this.linkParams;
    }
};

describe('HeroesComponent (deep integration tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    
    beforeEach(() => {
        mockHeroService  = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
    
        TestBed.configureTestingModule({
            declarations:
            [HeroesComponent,
             HeroComponent,
             RouterLinkDirectiveStub],
            providers:  [
                {provide: HeroService, useValue: mockHeroService}
            ],
       //    schemas:[NO_ERRORS_SCHEMA]
        })
    
        fixture = TestBed.createComponent(HeroesComponent);
        HEROES = [
            {id:1, name: 'SpiderMan', strength:8},
            {id:2, name: 'BathMan', strength:11},
            {id:3, name: 'WonderWoman', strength:28}
        ];
    });

    it('should render each hero as a HeroComponent', () => {
        //we need and.returnValue... becouse the method getHeroes returns observable and we have to say it what value we want to return
        //in our case is the mock obj HEROES
        mockHeroService.getHeroes.and.returnValue(of(HEROES)); 
         //triggers angular to fire angular funcs as ngOnInit etc
        fixture.detectChanges();

        //find child elements under a directive
        //in angular directive is the parnt class for both attribute directives and components (pr heroComponent <app-hero>)
        //By.directive(HeroComponent) this will give a list of all <app-hero> components (a, button etc)
       const heroComponentsDE = fixture.debugElement.queryAll(By.directive(HeroComponent)); 
       expect(heroComponentsDE.length).toEqual(3); //becouse we have 3 li elements of heroComp
       //we take the instance of heroComponent
       for(let i =0; i<heroComponentsDE.length;i++){
        expect(heroComponentsDE[i].componentInstance.hero).toEqual(HEROES[i]);
       }
    });

    //Testing a component that triggers an event on a sub component that is raised to a parent cpmponent
    it(`should call heroService.deleteHero when the HeroComponent's delete button is clicked`, () => {
       //we say what to return the mockedService
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
       //run ngOnInit
       fixture.detectChanges();
       
       //check if it is called
       spyOn(fixture.componentInstance, 'delete');

       //take all tags <app-hero>
       const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
       //take the button and trigger click
       //we create empty stopPropagation method shtoto v delete-a iska event sus stopPropagation method
       heroComponents[0].query(By.css('button'))
       .triggerEventHandler('click', {stopPropagation: () => {}});
       
       //Assert heroes[0] shtoot vzehme samo 1via element ot heroes - heroComponents[0].query(By.css('button'))
       expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    //Emitting events from children -  2nd possibility
    it(`should call heroService.deleteHero when the HeroComponent's delete button is clicked`, () => {
        //we say what to return the mockedService
         mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //run ngOnInit
        fixture.detectChanges();
        
        //check if it is called
        spyOn(fixture.componentInstance, 'delete');
 
        //take all tags <app-hero>
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        
        //trigger emit on delete button without calling the click event
        //undefined becouse the delete method in the component doesn't expect value
        (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
        
        //Assert heroes[0] shtoot vzehme samo 1via element ot heroes - heroComponents[0].query(By.css('button'))
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
     });
  
     //Rising events on child directives - 3rd possibility
     it(`should call heroService.deleteHero when the HeroComponent's delete button is clicked`, () => {
        //we say what to return the mockedService
         mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //run ngOnInit
        fixture.detectChanges();
        
        //check if it is called
        spyOn(fixture.componentInstance, 'delete');
 
        //take all tags <app-hero>
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        
        //Trigger event handler on the debug element, passing null or undefined
        heroComponents[0].triggerEventHandler('delete', null);
        
        //Assert heroes[0] shtoot vzehme samo 1via element ot heroes - heroComponents[0].query(By.css('button'))
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
     });

     //Interacting with input boxes
     it('should add a new hero to the hero list when the add button is clicked', () => {
         mockHeroService.getHeroes.and.returnValue(of(HEROES));
         fixture.detectChanges();
         const heroName = 'Mr. Ice';
         //we need to implement add hero method to our mockService as for the moment is only kuh object
         //this method return observable as the real method return observable
         mockHeroService.addHero.and.returnValue(of({id:5, name:heroName, strength:4}));
         const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
         inputElement.value = heroName; //this simulate typing the text into the input box
         
         //we take the 1st button as we know the first one is the one we need and trigger click on it
         const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
         addButton.triggerEventHandler('click', null);
         
         //update bindings
         fixture.detectChanges();
         //take the text of the input
         const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
         expect(heroText).toContain(name);
     });

     //Testing Router link
     //becouse of this test we commented no error schema and this had triggered routerlink error
     //we create fake router link directive
     it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        let routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub))
        .injector.get(RouterLinkDirectiveStub);
       
        //simulate click on a tag
        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
     });
})

//test coverage: To see the coverage Run ng test --code-coverage , kat se runne terminirame procesa
//i posle shte vidim che imame suzdadena nova dir coverage i v neia otvariame v browser index.html 