import chai = require('chai');
import { validateEmail } from '../controllers/Users/utils';

const expect = chai.expect;

describe('Unit', () => {

  describe('Check user registration', () => {
    it('should validate email', async () => {
      const emailWrong1 = validateEmail('qwerty');
      expect(emailWrong1).is.false;

      const emailWrong2 = validateEmail('johndoe@gmail');
      expect(emailWrong2).is.false;

      const emailWrong3 = validateEmail('johndoe@gmail.123');
      expect(emailWrong3).is.false;

      const emailWrong4 = validateEmail('');
      expect(emailWrong4).is.false;

      const emailWrong5 = validateEmail('user@192.168.1.0');
      expect(emailWrong5).is.false;

      const emailOk1 = validateEmail('johndoe@gmail.com');
      expect(emailOk1).is.true;

      const emailOk2 = validateEmail('john.doe1990@gmail.com');
      expect(emailOk2).is.true;

      const emailOk3 = validateEmail('0000@qwe.qw');
      expect(emailOk3).is.true;
    });
  });

});
