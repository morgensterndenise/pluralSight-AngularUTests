import { TestBed, ComponentFixture } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { AppRoutingModule } from "../app-routing.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroComponent>;

   beforeEach(() => {
       TestBed.configureTestingModule({
           declarations:[HeroComponent],
           schemas: [NO_ERRORS_SCHEMA]
       });
     fixture = TestBed.createComponent(HeroComponent);
   
   });

   it('should have the correct hero', () => {
       //Arrange
       fixture.componentInstance.hero = {id:1, name:'Super Mario', strength:3};
       //Assert
       expect(fixture.componentInstance.hero.name).toEqual('Super Mario');
   })

   it('should render the hero name in an anchor tag', () => {
    //Arrange
    fixture.componentInstance.hero = {id:1, name:'Super Mario', strength:3};
    fixture.detectChanges();

    //Assert
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super Mario');

    //Assert with debug element example
    expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('Super Mario');
   })
})