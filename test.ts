import { sayHello } from './index';

test('it should say hello', () => {
  expect(sayHello()).toBe('hello');
});

test('it shouldnt say f***', () => {
  expect(sayHello()).toBe('f***');
});
