var assert = require('assert');
const expect = require ('chai').expect;
let allWhiskeyReviews = require('../src/index.js').reviews;


describe('Whiskey Reviews should contain objects', () => {
  it('Should contain more than 1 review', () => {
    expect(allWhiskeyReviews.length).to.be.above(2);
  })
})

