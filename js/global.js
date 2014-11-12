define(['jquery', 'backbone'], function($) {

	_.templateSettings = {
		evaluate: /\{\{(.+?)\}\}/g,
		interpolate: /\{\{=(.+?)\}\}/g,
		escape: /\{\{-(.+?)\}\}/g
	};

    var translateElement = function(element) {

        var translate = function(key) {
            var args = key.split('|'), translation;
            key = args.shift();
            translation = Serenity._translations[Serenity.language][key] || key;
            while (args.length) {
                translation = translation.replace('{}', this.translate(args.shift()));
            }
            return translation;
        };

        var translation = translate(element.data('translate'));

        if (element.is('input')) {
            element.attr('placeholder', translation);
        } else if(element.is('optgroup')) {
            element.attr('label', translation);
        } else {
            element.html(translation);
        }
    };




    $.fn.extend({
        translate: function() {
            var toTranslate = this.find('[data-translate]');
            if (toTranslate.length === 0 && this.data('translate')) {
                translateElement(this);
            } else {
                $.each(toTranslate, function() {
                    translateElement($(this));
                });
            }

            return this;
        },
        toJSON: function(attr) {
            attr = attr || 'name';
            var elements = this.find('input, select, textarea'), json = {};
            $.each(elements, function() {
                var tmp = $(this);
                if ((!tmp.is(':disabled') && tmp.attr(attr) && !tmp.is(':radio')) || (tmp.is(':radio') && tmp.is(':checked'))) {
                    json[tmp.attr(attr)] = tmp.val();
                }
            });
            return json;
        },
        onAvailable: function(fn) {
            var selector = this.selector, element = $(selector), timer;
            if (this.length > 0) {
                fn.call(this, element);
            } else {
                timer = setInterval(function() {
                    element = $(selector);
                    if (element.length > 0) {
                        fn.call(element, element);
                        clearInterval(timer);
                    }
                }, 150);
            }
        },
        are: function(selector) {
            return !!selector && this.filter(selector).length === this.length;
        }
    });

	/*
	 * jquery.simulate - simulate browser mouse and keyboard events
	 *
	 * Copyright (c) 2009 Eduardo Lundgren (eduardolundgren@gmail.com)
	 * and Richard D. Worth (rdworth@gmail.com)
	 *
	 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
	 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
	 *
	 */

	;(function($) {

		$.fn.extend({
			simulate: function(type, options) {
				return this.each(function() {
					var opt = $.extend({}, $.simulate.defaults, options || {});
					new $.simulate(this, type, opt);
				});
			}
		});

		$.simulate = function(el, type, options) {
			this.target = el;
			this.options = options;

			if (/^drag$/.test(type)) {
				this[type].apply(this, [this.target, options]);
			} else {
				this.simulateEvent(el, type, options);
			}
		};

		$.extend($.simulate.prototype, {
			simulateEvent: function(el, type, options) {
				var evt = this.createEvent(type, options);
				this.dispatchEvent(el, type, evt, options);
				return evt;
			},
			createEvent: function(type, options) {
				if (/^mouse(over|out|down|up|move)|(dbl)?click$/.test(type)) {
					return this.mouseEvent(type, options);
				} else if (/^key(up|down|press)$/.test(type)) {
					return this.keyboardEvent(type, options);
				}
			},
			mouseEvent: function(type, options) {
				var evt;
				var e = $.extend({
					bubbles: true, cancelable: (type != "mousemove"), view: window, detail: 0,
					screenX: 0, screenY: 0, clientX: 0, clientY: 0,
					ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
					button: 0, relatedTarget: undefined
				}, options);

				var relatedTarget = $(e.relatedTarget)[0];

				if ($.isFunction(document.createEvent)) {
					evt = document.createEvent("MouseEvents");
					evt.initMouseEvent(type, e.bubbles, e.cancelable, e.view, e.detail,
						e.screenX, e.screenY, e.clientX, e.clientY,
						e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
						e.button, e.relatedTarget || document.body.parentNode);
				} else if (document.createEventObject) {
					evt = document.createEventObject();
					$.extend(evt, e);
					evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
				}
				return evt;
			},
			keyboardEvent: function(type, options) {
				var evt;

				var e = $.extend({ bubbles: true, cancelable: true, view: window,
					ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
					keyCode: 0, charCode: 0
				}, options);

				if ($.isFunction(document.createEvent)) {
					try {
						evt = document.createEvent("KeyEvents");
						evt.initKeyEvent(type, e.bubbles, e.cancelable, e.view,
							e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
							e.keyCode, e.charCode);
					} catch(err) {
						evt = document.createEvent("Events");
						evt.initEvent(type, e.bubbles, e.cancelable);
						$.extend(evt, { view: e.view,
							ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey, metaKey: e.metaKey,
							keyCode: e.keyCode, charCode: e.charCode
						});
					}
				} else if (document.createEventObject) {
					evt = document.createEventObject();
					$.extend(evt, e);
				}
				if (($.browser !== undefined) && ($.browser.msie || $.browser.opera)) {
					evt.keyCode = (e.charCode > 0) ? e.charCode : e.keyCode;
					evt.charCode = undefined;
				}
				return evt;
			},

			dispatchEvent: function(el, type, evt) {
				if (el.dispatchEvent) {
					el.dispatchEvent(evt);
				} else if (el.fireEvent) {
					el.fireEvent('on' + type, evt);
				}
				return evt;
			},

			drag: function(el) {
				var self = this, center = this.findCenter(this.target),
					options = this.options,	x = Math.floor(center.x), y = Math.floor(center.y),
					dx = options.dx || 0, dy = options.dy || 0, target = this.target;
				var coord = { clientX: x, clientY: y };
				this.simulateEvent(target, "mousedown", coord);
				coord = { clientX: x + 1, clientY: y + 1 };
				this.simulateEvent(document, "mousemove", coord);
				coord = { clientX: x + dx, clientY: y + dy };
				this.simulateEvent(document, "mousemove", coord);
				this.simulateEvent(document, "mousemove", coord);
				this.simulateEvent(target, "mouseup", coord);
			},
			findCenter: function(el) {
				var el = $(this.target), o = el.offset();
				return {
					x: o.left + el.outerWidth() / 2,
					y: o.top + el.outerHeight() / 2
				};
			}
		});

		$.extend($.simulate, {
			defaults: {
				speed: 'sync'
			},
			VK_TAB: 9,
			VK_ENTER: 13,
			VK_ESC: 27,
			VK_PGUP: 33,
			VK_PGDN: 34,
			VK_END: 35,
			VK_HOME: 36,
			VK_LEFT: 37,
			VK_UP: 38,
			VK_RIGHT: 39,
			VK_DOWN: 40
		});

	})(jQuery);

	(function($) {

		//BlocksIt default options
		var blocksOptions = {
			numOfCol: 5,
			offsetX: 5,
			offsetY: 5,
			blockElement: 'div'
		};

		//dynamic variable
		var container, colwidth;
		var blockarr = [];

		//ie indexOf fix
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function(elt /*, from*/) {
				var len = this.length >>> 0;

				var from = Number(arguments[1]) || 0;
				from = (from < 0) ? Math.ceil(from) : Math.floor(from);
				if (from < 0)
					from += len;

				for (; from < len; from++) {
					if (from in this &&
						this[from] === elt)
						return from;
				}
				return -1;
			};
		}

		//create empty blockarr
		var createEmptyBlockarr = function() {
			//empty blockarr
			blockarr = [];
			for(var i=0; i<blocksOptions.numOfCol; i++) {
				blockarrPush('empty-'+i, i, 0, 1, -blocksOptions.offsetY);
			}
		}

		//add new block to blockarr
		var blockarrPush = function(id, x, y, width, height) {
			//define block object based on block width
			for(var i=0; i<width; i++) {
				var block = new Object();
				block.x = x + i;
				block.size = width;
				block.endY = y + height + blocksOptions.offsetY*2;

				blockarr.push(block);
			}
		}

		//remove block from blockarr
		var blockarrRemove = function(x, num) {
			for(var i=0; i<num; i++) {
				//remove block beside
				var index = getBlockIndex(x+i, 'x');
				blockarr.splice(index, 1);
			}
		}

		//retrieve block index based on block's x position
		var getBlockIndex = function(value, type) {

			for(var i=0; i<blockarr.length; i++) {
				var obj = blockarr[i];
				if(type == "x" && obj.x == value) {
					return i;
				} else if(type == "endY" && obj.endY == value) {
					return i;
				}
			}
		}

		//get height from blockarr range based on block.x and size
		//retrun min and max height
		var getHeightArr = function(x, size) {
			var temparr = [];
			for(var i=0; i<size; i++) {
				temparr.push(blockarr[getBlockIndex(x+i, 'x')].endY);
			}
			var min = Math.min.apply(Math, temparr);
			var max = Math.max.apply(Math, temparr);

			return [min, max, temparr.indexOf(min)];
		}

		//get block x and y position
		var getBlockPostion = function(size) {

			//if block width is not default 1
			//extra algorithm check
			if(size > 1) {
				//prevent extra loop
				var arrlimit = blockarr.length - size;
				//define temp variable
				var defined = false;
				var tempHeight, tempIndex;

				for(var i=0; i<blockarr.length; i++) {
					var obj = blockarr[i];
					var x = obj.x;

					//check for block within range only
					if(x >= 0 && x <= arrlimit) {
						var heightarr = getHeightArr(x, size);

						//get shortest group blocks
						if(!defined) {
							defined = true;
							tempHeight = heightarr;
							tempIndex = x;
						} else {
							if(heightarr[1] < tempHeight[1]) {
								tempHeight = heightarr;
								tempIndex = x;
							}
						}
					}
				}
				return [tempIndex, tempHeight[1]];
			} else { //simple check for block with width 1
				tempHeight = getHeightArr(0, blockarr.length);
				return [tempHeight[2], tempHeight[0]];
			}
		}

		//set block position
		var setPosition = function(obj, index) {
			//check block size
			if(!obj.data('size') || obj.data('size') < 0) {
				obj.data('size', 1);
			} else if(obj.data('size') > blocksOptions.numOfCol) {
				obj.data('size', blocksOptions.numOfCol);
			}

			//define block data
			var pos = getBlockPostion(obj.data('size'));
			var blockWidth = colwidth * obj.data('size') - (obj.outerWidth() - obj.width());

			//update style first before get object height
			obj.css({
				'width': blockWidth - blocksOptions.offsetX*2,
				'left': pos[0] * colwidth,
				'top': pos[1],
				'position': 'absolute'
			});

			var blockHeight = obj.outerHeight();

			//modify blockarr for new block
			blockarrRemove(pos[0], obj.data('size'));
			blockarrPush(obj.attr('id'), pos[0], pos[1], obj.data('size'), blockHeight);
		}

		$.fn.BlocksIt = function(options) {
			//BlocksIt options
			if (options && typeof options === 'object') {
				$.extend(blocksOptions, options);
			}

			container = $(this);
			colwidth = container.width() / blocksOptions.numOfCol;

			//create empty blockarr
			createEmptyBlockarr();

			container.children(blocksOptions.blockElement).each(function(e) {
				setPosition($(this), e);
			});

			//set final height of container
			var heightarr = getHeightArr(0, blockarr.length);
			container.height(heightarr[1] + blocksOptions.offsetY);

			return this;
		}

	})(jQuery);

});