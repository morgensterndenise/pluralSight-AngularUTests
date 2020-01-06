import { MessageService } from "./message.service";

describe('MessageService', () => {
        let service: MessageService;
        beforeEach(() => {
            service = new MessageService();
        });

       it('should have no message to start', () => {
        expect(service.messages.length).toBe(0);
       }) 

       it('should add message when add is called', () => {
          //Arrange
          let msg = 'one';

          //Act
          service.add(msg);

         //Assert
         expect(service.messages.length).toBe(1);
         expect(service.messages[0]).toEqual(msg);
       })

       it('should remove all messages when clear is called', () => {
        //Arrange
        service.add('msg');

        //Act
        service.clear();

       //Assert
       expect(service.messages.length).toBe(0);
     })
})