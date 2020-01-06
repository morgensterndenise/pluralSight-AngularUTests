import { HeroesComponent } from "./heroes.component"
import { Hero } from "../hero";
import { componentFactoryName } from "@angular/compiler";
import { of } from "rxjs";

describe('HeroesComponent', () => {

    let heroesComponent: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(()=>  {
        HEROES = [
            {id:1, name: 'SpiderMan', strength:8},
            {id:2, name: 'BathMan', strength:11},
            {id:3, name: 'WonderWoman', strength:28}
        ];
        //to create a mock to this service we use jasmine in wich we pass array of method names, if the obj has no methods we leave it blanck
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);

        heroesComponent = new HeroesComponent(mockHeroService);
    })
   
    describe('delete', () => {
        it('should delete the indicated hero from the hero list', () => {
           //Arrange
           //poneje delete methoda vrushta observable kum koiato da se subscribnem polzvame prop na jasmine and i mu kazvame da returne value
           //of e method na rxjs i triabva da se importne. Toj suzdava simple observable, koito podava valuto koiato sme slojili v ()
           mockHeroService.deleteHero.and.returnValue(of(true));
           heroesComponent.heroes = HEROES;

            //Act
            heroesComponent.delete(HEROES[2]);

            //Assert
            expect(heroesComponent.heroes.length).toBe(2);
        })

        it('should call deleteHero', () => {
            //Arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            heroesComponent.heroes = HEROES;

            //Act
            heroesComponent.delete(HEROES[2]);
          
            //Assert
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        })
    })
})