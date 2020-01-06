describe('my first test', () => {
let sut;
beforeEach(()=> {
    sut = {};
})

it('should be true if true', () => {
    //here we write our test
    //Arrange
    //1. we get our initial state
    sut.a = false;

    //Act
    //2. we change our initial state
    sut.a = true;

    //Assert
    //3. we assert if our initial state had changed to what we expect to be
    expect(sut.a).toBe(true);
})

})