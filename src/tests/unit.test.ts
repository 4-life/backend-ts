import chai = require('chai');
import { validateEmail } from '../controllers/Users/utils';
import { validateIdentify } from '../controllers/Contacts/utils';

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


  describe('Check contact creation', () => {
    it('should validate identify', async () => {
      const wrong1 = validateIdentify('   ');
      expect(wrong1).is.false;

      const wrong2 = validateIdentify('john doe');
      expect(wrong2).is.false;

      const wrong3 = validateIdentify('johndoe@gmail.com');
      expect(wrong3).is.false;

      const wrong4 = validateIdentify('');
      expect(wrong4).is.false;

      const bigString = [...Array(129)].map(_ => Math.random().toString(36).substring(3, 4)).join('');
      const wrong5 = validateIdentify(bigString);
      expect(wrong5).is.false;

      const ok1 = validateIdentify('johndoe');
      expect(ok1).is.true;

      const ok2 = validateIdentify('john-smith');
      expect(ok2).is.true;

      const ok3 = validateIdentify('john_smith');
      expect(ok3).is.true;
    });
  });
});
