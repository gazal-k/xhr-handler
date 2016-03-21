# xhr-events [![Build Status](https://travis-ci.org/gazal-k/xhr-events.svg?branch=master)](https://travis-ci.org/gazal-k/xhr-events)

An interceptor for Polymer's iron-request element that generates events on document object.

## Usage

Include in your polymer application.

```html
<script src="../../bower_components/xhr-events/xhr-events.js"></script>
```

Add event listeners for xhr.

```js
document.addEventListener('xhr-request', function(event) {
  console.log('xhr-request', event.detail);
});
document.addEventListener('xhr-response', function(event) {
  console.log('xhr-response', event.detail);
});
document.addEventListener('xhr-error', function(event) {
  console.log('xhr-error', event.detail);
});
```

## Polyfill

For IE, use this polyfill

https://github.com/krambuhl/custom-event-polyfill
