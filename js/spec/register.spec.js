import faker from 'faker';
import puppeteer from 'puppeteer';

const APP = 'https://siffersari.github.io/Questioner-Ultimate/register.html';

const lead = {
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  other: faker.name.firstName(),
  username: faker.name.lastName(),
  email: faker.internet.email(),
  phone: '0704591667',
  password: 'P@ssw0rd',
  repPassword: 'P@ssw0rd',
};

let page;
let browser;
const width = 1920;
const height = 1080;

require('babel-polyfill');

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});


describe('Signup page', () => {
  test('assert that <title> is correct', async () => {
    await page.goto(APP);
    const title = await page.title();
    expect(title).toBe(
      'Questioner - Signup',
    );
  });
  test('assert that brand name exists', async () => {
    const navbrand = await page.$eval('.questioner-navbrand', el => (!!el));
    expect(navbrand).toBe(true);
  });
  test('Lead can submit a signup request', async () => {
    try {
      await page.waitForSelector('form[name=signup-form]');

      await page.click('input[name=first]');
      await page.type('input[name=first]', lead.first);
      await page.click('input[name=last]');
      await page.type('input[name=last]', lead.last);
      await page.click('input[name=other]');
      await page.type('input[name=other]', lead.other);
      await page.click('input[name=username]');
      await page.type('input[name=username]', lead.username);
      await page.click('input[name=email]');
      await page.type('input[name=email]', lead.email);
      await page.click('input[name=number]');
      await page.type('input[name=number]', lead.phone);
      await page.click('input[name=password]');
      await page.type('input[name=password]', lead.password);
      await page.click('input[name=pass-repeat]');
      await page.type('input[name=pass-repeat]', lead.repPassword);
      await page.click('button[name=submit]');
      await page.waitForSelector('form[name=login-form]');
    } catch (e) {
      console.log(e);
    }
  }, 26000);
});

describe('Login form', () => {
  test('assert that <title> is correct', async () => {
    const title = await page.title();
    expect(title).toBe(
      'Questioner - Sign In',
    );
  });
  test('assert that brand name exists', async () => {
    const navbrand = await page.$eval('.questioner-navbrand', el => (!!el));
    expect(navbrand).toBe(true);
  });
  test('lead can submit a login request', async () => {
    try {
      await page.waitForSelector('form[name=login-form]');
      await page.click('input[name=username]');
      await page.type('input[name=username]', lead.username);
      await page.click('input[name=password]');
      await page.type('input[name=password]', lead.password);
      await page.click('button[name=submit]');
      await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#questiondivision');
      const title = await page.title();
      expect(title).toBe(
        'Questioner - Home',
      );
    } catch (e) {
      console.log(e);
    }
  }, 16000);
});
