(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Dispatcher, Persistence;

Dispatcher = require('./Dispatcher.coffee');

Persistence = require('./Persistence.coffee');

module.exports = {
  getData: function(path) {
    return Persistence.get(path, function(err, arg) {
      var data;
      data = arg.data;
      if (err != null) {
        throw new "Server error";
      }
      return Dispatcher.dispatch({
        gotData: {
          path: path,
          data: data
        }
      });
    });
  }
};


},{"./Dispatcher.coffee":2,"./Persistence.coffee":3}],2:[function(require,module,exports){
module.exports = new Flux.Dispatcher();


},{}],3:[function(require,module,exports){
var dup;

dup = {};

module.exports = {
  get: function(path, cb) {
    if (!dup[path]) {
      dup[path] = true;
      return urb.bind("/scry/x/womb" + path, {
        appl: "hood"
      }, cb);
    }
  }
};


},{}],4:[function(require,module,exports){
var EventEmitter, WombDispatcher, WombStore, _data, unpackFrond;

EventEmitter = require('events').EventEmitter;

unpackFrond = require('./util.coffee').unpackFrond;

WombDispatcher = require('./Dispatcher.coffee');

_data = {};

WombStore = _.extend(new EventEmitter, {
  emitChange: function() {
    return this.emit('change');
  },
  addChangeListener: function(cb) {
    return this.on('change', cb);
  },
  retrieve: function(path) {
    return _data[path];
  },
  gotData: function(arg1) {
    var data, path;
    path = arg1.path, data = arg1.data;
    return _data[path] = data;
  }
});

WombStore.dispatchToken = WombDispatcher.register(function(action) {
  var arg, ref, type;
  ref = unpackFrond(action), type = ref[0], arg = ref[1];
  if (WombStore[type]) {
    WombStore[type](arg);
    return WombStore.emitChange();
  }
});

module.exports = WombStore;


},{"./Dispatcher.coffee":2,"./util.coffee":10,"events":12}],5:[function(require,module,exports){
var Balance, History, Mail, Planets, Scry, Stars, _Options, b, button, clas, code, div, h6, input, li, name, p, pre, recl, ref, rele, shipShape, span, ul;

clas = require('classnames');

shipShape = require('../util.coffee').shipShape;

Scry = require('./Scry.coffee');

recl = React.createClass;

rele = React.createElement;

name = function(displayName, component) {
  return _.extend(component, {
    displayName: displayName
  });
};

ref = React.DOM, ul = ref.ul, li = ref.li, div = ref.div, b = ref.b, h6 = ref.h6, input = ref.input, button = ref.button, p = ref.p, span = ref.span, pre = ref.pre, code = ref.code;

Mail = function(email) {
  return code({
    className: "email"
  }, email);
};

History = function(history) {
  var key, who;
  if (!history.length) {
    return "purchased directly from Tlon Inc. ";
  } else {
    return span({}, "previously owned by ", (function() {
      var i, len, results;
      results = [];
      for (key = i = 0, len = history.length; i < len; key = ++i) {
        who = history[key];
        results.push(span({
          key: key
        }, Mail(who)));
      }
      return results;
    })(), "and Tlon Inc. ");
  }
};

_Options = function(type) {
  var Shop;
  Shop = Scry("/shop/" + type, function(arg) {
    var data, who;
    data = arg.data;
    return ul({
      className: "options options-" + type
    }, (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = data.length; i < len; i++) {
        who = data[i];
        results.push(li({
          className: "shop",
          key: who
        }, span({
          className: "mono"
        }, who)));
      }
      return results;
    })());
  });
  return recl({
    reroll: function() {
      return {
        shipSelector: Math.floor(Math.random() * 10)
      };
    },
    onClick: function() {
      return this.setState(this.reroll());
    },
    getInitialState: function() {
      return this.reroll();
    },
    render: function() {
      return div({}, h6({}, "Semi-random avaliable " + type + ".", button({
        onClick: this.onClick
      }, "Reroll")), rele(Shop, _.extend({}, this.props, {
        spur: "/" + this.state.shipSelector
      })));
    }
  });
};

Stars = _Options("stars");

Planets = _Options("planets");

Balance = Scry("/balance", function(arg) {
  var history, owner, planets, ref1, stars;
  ref1 = arg.data, planets = ref1.planets, stars = ref1.stars, owner = ref1.owner, history = ref1.history;
  return div({}, h6({}, "Balance"), p({}, "Hello ", Mail(owner)), p({}, "This balance was ", History(history), "It contains ", b({}, planets || "no"), " Planets ", "and ", b({}, stars || "no"), " Stars."), stars ? rele(Stars) : void 0, planets ? rele(Planets) : void 0);
});

module.exports = recl({
  displayName: "Claim",
  getInitialState: function() {
    return {
      passcode: "~waclev-nornex-bornec-fitfed--librys-tapsut-docrus-fittel"
    };
  },
  onChange: function(arg) {
    var pass, target;
    target = arg.target;
    pass = target.value.trim();
    if (pass[0] !== '~') {
      pass = "~" + pass;
    }
    return this.setState({
      passcode: (shipShape(pass)) && pass.length === 57 ? pass : void 0
    });
  },
  render: function() {
    return div({}, p({}, "Input a passcode to claim ships: "), input({
      onChange: this.onChange,
      defaultValue: ""
    }), this.state.passcode ? rele(Balance, {
      spur: "/" + this.state.passcode
    }) : void 0);
  }
});


},{"../util.coffee":10,"./Scry.coffee":7,"classnames":11}],6:[function(require,module,exports){
var Claim, Ships, div, h4, ref, rele;

Claim = require('./Claim.coffee');

Ships = require('./Ships.coffee');

rele = React.createElement;

ref = React.DOM, div = ref.div, h4 = ref.h4;

module.exports = function() {
  return div({}, h4({}, "Claims"), rele(Claim, {}), h4({}, "Network"), rele(Ships, {}));
};


},{"./Claim.coffee":5,"./Ships.coffee":8}],7:[function(require,module,exports){
var Actions, Store, div, i, recl, ref, rele;

Actions = require('../Actions.coffee');

Store = require('../Store.coffee');

recl = React.createClass;

rele = React.createElement;

ref = React.DOM, div = ref.div, i = ref.i;

module.exports = function(path, Child) {
  return recl({
    displayName: "Scry" + path.split('/').join('-'),
    getInitialState: function() {
      return this.retrieveData();
    },
    retrieveData: function() {
      return {
        data: Store.retrieve(this.getPath())
      };
    },
    getPath: function() {
      var ref1;
      return path + ((ref1 = this.props.spur) != null ? ref1 : "");
    },
    checkState: function() {
      if (this.state.data == null) {
        return Actions.getData(this.getPath());
      }
    },
    componentDidMount: function() {
      Store.addChangeListener(this.changeListener);
      return this.checkState();
    },
    componentWillUnmount: function() {
      return Store.removeChangeListener(this.changeListener);
    },
    componentDidUpdate: function(_props, _state) {
      if (_props !== this.props) {
        this.setState(this.retrieveData());
      }
      return this.checkState();
    },
    changeListener: function() {
      if (this.isMounted()) {
        return this.setState(this.retrieveData());
      }
    },
    render: function() {
      return div({}, this.state.data == null ? i({
        key: "load"
      }, "Fetching data...") : rele(Child, _.extend({}, this.props, {
        key: "got",
        data: this.state.data
      }), this.props.children));
    }
  });
};


},{"../Actions.coffee":1,"../Store.coffee":4}],8:[function(require,module,exports){
var Label, Scry, Stat, clas, code, div, labels, li, name, p, pre, recl, ref, rele, span, ul;

clas = require('classnames');

Scry = require('./Scry.coffee');

recl = React.createClass;

rele = React.createElement;

name = function(displayName, component) {
  return _.extend(component, {
    displayName: displayName
  });
};

ref = React.DOM, p = ref.p, ul = ref.ul, li = ref.li, span = ref.span, div = ref.div, pre = ref.pre, code = ref.code;

labels = {
  free: "Unallocated",
  owned: "Issued",
  split: "Distributing"
};

Label = function(s) {
  return span({
    className: "label label-default"
  }, s);
};

Stat = name("Stat", function(stats) {
  var className, free, owned, ship, split, stat;
  return ul({}, (function() {
    var results;
    results = [];
    for (ship in stats) {
      stat = stats[ship];
      free = stat.free, owned = stat.owned, split = stat.split;
      className = clas(stat);
      results.push(li({
        className: className,
        key: ship
      }, span({
        className: "mono"
      }, "~" + ship + ": "), (function() {
        switch (false) {
          case free == null:
            return Label(labels.free);
          case owned == null:
            return Label(labels.owned);
          case split == null:
            if (_.isEmpty(split)) {
              return Label(labels.split);
            } else {
              return rele(Stat, split);
            }
            break;
          default:
            throw new Error("Bad stat: " + (_.keys(stat)));
        }
      })()));
    }
    return results;
  })());
});

module.exports = Scry("/stats", function(arg) {
  var data;
  data = arg.data;
  return rele(Stat, data);
});


},{"./Scry.coffee":7,"classnames":11}],9:[function(require,module,exports){
var MainComponent, TreeActions;

MainComponent = require('./components/Main.coffee');

TreeActions = window.tree.actions;

TreeActions.registerComponent("womb", MainComponent);


},{"./components/Main.coffee":6}],10:[function(require,module,exports){
var PO, SHIPSHAPE,
  slice = [].slice;

SHIPSHAPE = /^~?([a-z]{3}|[a-z]{6}(-[a-z]{6}){0,3}|[a-z]{6}(-[a-z]{6}){3}(--[a-z]{6}(-[a-z]{6}){3})+)$/;

PO = 'dozmarbinwansamlitsighidfidlissogdirwacsabwissib\nrigsoldopmodfoglidhopdardorlorhodfolrintogsilmir\nholpaslacrovlivdalsatlibtabhanticpidtorbolfosdot\nlosdilforpilramtirwintadbicdifrocwidbisdasmidlop\nrilnardapmolsanlocnovsitnidtipsicropwitnatpanmin\nritpodmottamtolsavposnapnopsomfinfonbanporworsip\nronnorbotwicsocwatdolmagpicdavbidbaltimtasmallig\nsivtagpadsaldivdactansidfabtarmonranniswolmispal\nlasdismaprabtobrollatlonnodnavfignomnibpagsopral\nbilhaddocridmocpacravripfaltodtiltinhapmicfanpat\ntaclabmogsimsonpinlomrictapfirhasbosbatpochactid\nhavsaplindibhosdabbitbarracparloddosbortochilmac\ntomdigfilfasmithobharmighinradmashalraglagfadtop\nmophabnilnosmilfopfamdatnoldinhatnacrisfotribhoc\nnimlarfitwalrapsarnalmoslandondanladdovrivbacpol\nlaptalpitnambonrostonfodponsovnocsorlavmatmipfap\n\nzodnecbudwessevpersutletfulpensytdurwepserwylsun\nrypsyxdyrnuphebpeglupdepdysputlughecryttyvsydnex\nlunmeplutseppesdelsulpedtemledtulmetwenbynhexfeb\npyldulhetmevruttylwydtepbesdexsefwycburderneppur\nrysrebdennutsubpetrulsynregtydsupsemwynrecmegnet\nsecmulnymtevwebsummutnyxrextebfushepbenmuswyxsym\nselrucdecwexsyrwetdylmynmesdetbetbeltuxtugmyrpel\nsyptermebsetdutdegtexsurfeltudnuxruxrenwytnubmed\nlytdusnebrumtynseglyxpunresredfunrevrefmectedrus\nbexlebduxrynnumpyxrygryxfeptyrtustyclegnemfermer\ntenlusnussyltecmexpubrymtucfyllepdebbermughuttun\nbylsudpemdevlurdefbusbeprunmelpexdytbyttyplevmyl\nwedducfurfexnulluclennerlexrupnedlecrydlydfenwel\nnydhusrelrudneshesfetdesretdunlernyrsebhulryllud\nremlysfynwerrycsugnysnyllyndyndemluxfedsedbecmun\nlyrtesmudnytbyrsenwegfyrmurtelreptegpecnelnevfes';

module.exports = {
  unpackFrond: function(a) {
    var alts, key, ref;
    ref = _.keys(a), key = ref[0], alts = 2 <= ref.length ? slice.call(ref, 1) : [];
    if (!_.isEmpty(alts)) {
      throw new Error("Improper frond: " + ([key].concat(slice.call(alts)).join(',')));
    }
    return [key, a[key]];
  },
  shipShape: function(a) {
    return (SHIPSHAPE.test(a)) && _.all(a.match(/[a-z]{3}/g), function(b) {
      return -1 !== PO.indexOf(b);
    });
  }
};


},{}],11:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[9]);
