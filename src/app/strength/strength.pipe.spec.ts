import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {
  describe('transform method test', () => {
      let value;
      beforeEach(()=> {
          value = 0;
      })

      it('should display weak if strength is 5', () => {
          let pipe = new StrengthPipe();

          //Arrange
         value = 5;

          //Act
         let result = pipe.transform(value);

         //Assert
          expect(result).toEqual('5 (weak)');
      })

      it('should display strong if strength is 11', () => {
          let pipe = new StrengthPipe();

          //Arrange
          value = 11;

          //Act
          let result = pipe.transform(value);

          //Assert
          expect(result).toEqual('11 (strong)');
      })

      it('should display unbelievable if strength is 21', () => {
        let pipe = new StrengthPipe();

        //Arrange
        value = 21;

        //Act
        let result = pipe.transform(value);

        //Assert
        expect(result).toEqual('21 (unbelievable)');
    })
  })
})