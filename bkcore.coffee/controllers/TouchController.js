// Generated by CoffeeScript 1.7.1

/*
  TouchController (stick + buttons) for touch devices
  Based on the touch demo by Seb Lee-Delisle <http://seb.ly/>
 */

(function() {
  var TouchController, Vec2, exports, _base;

  TouchController = (function() {
    TouchController.isCompatible = function() {
      return 'ontouchstart' in document.documentElement;
    };


    /*
      Creates a new TouchController
    
      @param dom DOMElement The element that will listen to touch events
      @param stickMargin int The left margin in px for stick detection
      @param buttonCallback function Callback for non-stick touches
     */

    function TouchController(dom, stickMargin, buttonCallback) {
      this.dom = dom;
      this.stickMargin = stickMargin != null ? stickMargin : 200;
      this.buttonCallback = buttonCallback != null ? buttonCallback : null;
      this.active = true;
      this.touches = null;
      this.stickID = -1;
      this.stickPos = new Vec2(0, 0);
      this.stickStartPos = new Vec2(0, 0);
      this.stickVector = new Vec2(0, 0);
      this.dom.addEventListener('touchstart', ((function(_this) {
        return function(e) {
          return _this.touchStart(e);
        };
      })(this)), false);
      this.dom.addEventListener('touchmove', ((function(_this) {
        return function(e) {
          return _this.touchMove(e);
        };
      })(this)), false);
      this.dom.addEventListener('touchend', ((function(_this) {
        return function(e) {
          return _this.touchEnd(e);
        };
      })(this)), false);
    }


    /*
      @private
     */

    TouchController.prototype.touchStart = function(event) {
      var touch, _i, _len, _ref;
      if (!this.active) {
        return;
      }
      _ref = event.changedTouches;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        touch = _ref[_i];
        if (this.stickID < 0 && touch.clientX < this.stickMargin) {
          this.stickID = touch.identifier;
          this.stickStartPos.set(touch.clientX, touch.clientY);
          this.stickPos.copy(this.stickStartPos);
          this.stickVector.set(0, 0);
          continue;
        } else {
          if (typeof this.buttonCallback === "function") {
            this.buttonCallback(true, touch, event);
          }
        }
      }
      this.touches = event.touches;
      return false;
    };


    /*
      @private
     */

    TouchController.prototype.touchMove = function(event) {
      var touch, _i, _len, _ref;
      event.preventDefault();
      if (!this.active) {
        return;
      }
      _ref = event.changedTouches;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        touch = _ref[_i];
        if (this.stickID === touch.identifier && touch.clientX < this.stickMargin) {
          this.stickPos.set(touch.clientX, touch.clientY);
          this.stickVector.copy(this.stickPos).substract(this.stickStartPos);
          break;
        }
      }
      this.touches = event.touches;
      return false;
    };


    /*
      @private
     */

    TouchController.prototype.touchEnd = function(event) {
      var touch, _i, _len, _ref;
      if (!this.active) {
        return;
      }
      this.touches = event.touches;
      _ref = event.changedTouches;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        touch = _ref[_i];
        if (this.stickID === touch.identifier) {
          this.stickID = -1;
          this.stickVector.set(0, 0);
          break;
        } else {
          if (typeof this.buttonCallback === "function") {
            this.buttonCallback(false, touch, event);
          }
        }
      }
      return false;
    };

    return TouchController;

  })();


  /*
    Internal class used for vector2
    @class Vec2
    @private
   */

  Vec2 = (function() {
    function Vec2(x, y) {
      this.x = x != null ? x : 0;
      this.y = y != null ? y : 0;
    }

    Vec2.prototype.substract = function(vec) {
      this.x -= vec.x;
      this.y -= vec.y;
      return this;
    };

    Vec2.prototype.copy = function(vec) {
      this.x = vec.x;
      this.y = vec.y;
      return this;
    };

    Vec2.prototype.set = function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    };

    return Vec2;

  })();


  /*
    Exports
    @package bkcore
   */

  exports = exports != null ? exports : this;

  exports.bkcore || (exports.bkcore = {});

  (_base = exports.bkcore).controllers || (_base.controllers = {});

  exports.bkcore.controllers.TouchController = TouchController;

}).call(this);
