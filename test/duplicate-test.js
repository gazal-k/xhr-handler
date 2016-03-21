/* jshint expr: true */
/* globals fixture */
describe('<xhr-handler> duplicate', function() {

  var xhrHandler;
  var handleSpy;

  before(function() {
    xhrHandler = document.createElement('xhr-handler');
    xhrHandler = Object.getPrototypeOf(xhrHandler);
    handleSpy = sinon.spy(xhrHandler, '_handle');
  });

  describe('when there are multiple references of xhr-handler', function() {

    var test;
    before(function() {
      test = fixture('test');
    });

    it('should not setup xhr handling more than once', function(done) {
      setTimeout(function() {
        expect(handleSpy).to.be.calledOnce;
        done();
      });
    });

  });

});
