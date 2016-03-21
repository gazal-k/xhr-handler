/* jshint expr: true */
/* globals fixture */
describe('<xhr-handler> basic', function() {

  var server;
  var xhrSpy;
  var toastSpy;
  var xhrHandler;

  before(function() {
    server = sinon.fakeServer.create({
      autoRespond: true
    });

    server.respondWith('GET', '/pass', [200, {}, '{}']);
    server.respondWith('GET', '/fail', [401, {}, '{}']);

    xhrSpy = sinon.spy(server, 'handleRequest');

    xhrHandler = document.querySelector('xhr-handler');

    toastSpy = sinon.spy(xhrHandler.$.toast, 'show');
  });

  afterEach(function() {
    xhrSpy.reset();
  });

  describe('when requesting URI that will pass', function() {

    var request;

    it('should show loadMask', function() {
      var pass = fixture('pass');
      request = pass.generateRequest();

      expect(xhrSpy).to.be.calledOnce;
      expect(xhrHandler.$.loadMask.style.display).to.be.equal('block');
    });

    it('should hide loadMask when done', function(done) {
      request.completes.then(function() {
        try {
          expect(xhrHandler.$.loadMask.style.display).to.be.equal('none');
          done();
        } catch (err) {
          done(err);
        }
      });
    });

  });

  describe('when requesting URI that will fail', function() {

    var request;

    it('should show loadMask', function() {
      var fail = fixture('fail');
      request = fail.generateRequest();

      expect(xhrSpy).to.be.calledOnce;
      expect(xhrHandler.$.loadMask.style.display).to.be.equal('block');
    });

    it('should hide loadMask when failed', function(done) {
      request.completes['catch'](function() {
        try {
          expect(xhrHandler.$.loadMask.style.display).to.be.equal('none');
          done();
        } catch (err) {
          done(err);
        }
      });
    });

    it('should show toast after fail', function(done) {
      request.completes['catch'](function() {
        try {
          expect(toastSpy).to.be.calledOnce;
          done();
        } catch (err) {
          done(err);
        }
      });
    });

    after(function() {
      toastSpy.reset();
    });

  });

  describe('when skipPatterns is configured', function() {

    var request;

    before(function() {
      xhrHandler.set('skipPatterns', {
        401: [/^\/fail$/]
      });
    });

    after(function() {
      xhrHandler.set('skipPatterns', {});
    });

    it('should show loadMask', function() {
      var fail = fixture('fail');
      request = fail.generateRequest();

      expect(xhrSpy).to.be.calledOnce;
      expect(xhrHandler.$.loadMask.style.display).to.be.equal('block');
    });

    it('should hide loadMask when failed', function(done) {
      request.completes['catch'](function() {
        try {
          expect(xhrHandler.$.loadMask.style.display).to.be.equal('none');
          done();
        } catch (err) {
          done(err);
        }
      });
    });

    it('should not show toast after fail', function(done) {
      request.completes['catch'](function() {
        try {
          expect(toastSpy.called).to.be['false'];
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  after(function() {
    server.restore();
  });

});
