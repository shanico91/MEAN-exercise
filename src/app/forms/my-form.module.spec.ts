import { MyFormModule } from './my-form.module';

describe('MyFormModule', () => {
  let myFormModule: MyFormModule;

  beforeEach(() => {
    myFormModule = new MyFormModule();
  });

  it('should create an instance', () => {
    expect(myFormModule).toBeTruthy();
  });
});
