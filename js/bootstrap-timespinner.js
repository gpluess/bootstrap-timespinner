/* =========================================================
 * bootstrap-timespinner.js v0.1
 * https://github.com/gpluess/bootstrap-timespinner
 * =========================================================
 * Copyright 2012 Gregory Plüss
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */



!function ($) {

  "use strict"; // jshint ;_;


 /* TIMESPINNER PUBLIC CLASS DEFINITION
  * ================================ */

  var Timespinner = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.timespinner.defaults, options)
  }

  Timespinner.prototype = {

    constructor: Timespinner

    , increase: function () {
        calculate.call(this, 'up')
    }
    , decrease: function () {
        calculate.call(this, 'down')
    }
  }


 /* TIMESPINNER PRIVATE METHODS
  * ===================== */

  function pad(number) {
    return (number < 10 ? '0' : '') + number
  }

  function calculate(direction) {
    var time = this.$element.val().split(':'),
        hours = parseInt(time[0], 10),
        minutes = parseInt(time[1], 10)

    if (direction === 'up') {
      if (minutes < this.options.minutes_max - this.options.minutes_interval) {
        minutes += this.options.minutes_interval
      } else {
        minutes = this.options.minutes_interval - (this.options.minutes_max - minutes)

        if (hours < this.options.hours_max - this.options.hours_interval) {
          hours += this.options.hours_interval
        } else {
          hours = this.options.hours_min
        }
      }
    } else {
      if (minutes >= this.options.minutes_min + this.options.minutes_interval) {
        minutes -= this.options.minutes_interval
      } else {
        minutes = this.options.minutes_max + (minutes - this.options.minutes_interval)

        if (hours >= this.options.hours_min + this.options.hours_interval) {
          hours -= this.options.hours_interval
        } else {
          hours = this.options.hours_max + (hours - this.options.hours_interval)
        }
      }
    }
    this.$element.val([pad(hours), pad(minutes)].join(':'))
  }


 /* TIMESPINNER PLUGIN DEFINITION
  * ============================== */

  var old = $.fn.timespinner

  $.fn.timespinner = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('timespinner')
        , options = $.extend({}, $.fn.timespinner.defaults, typeof option == 'object' && option)
      if (!data) $this.data('timespinner', (data = new Timespinner(this)))
      if (typeof option == 'string' || (option = options.timespinner)) data[option]()
    })
  }

  $.fn.timespinner.defaults = {
      hours_interval: 1,
      hours_min: 0,
      hours_max: 24,
      minutes_interval: 15,
      minutes_min: 0,
      minutes_max: 60
  }

  $.fn.timespinner.Constructor = Timespinner


 /* TIMESPINNER NO CONFLICT
  * ================= */

  $.fn.timespinner.noConflict = function () {
    $.fn.timespinner = old
    return this
  }

 /* TIMESPINNER DATA-API
  * ==================== */

  $(function () {
    $('body').on('click.timespinner.data-api', '[data-timespinner]', function (e) {
      var $this = $(this)
        , $target = $($this.attr('href'))
        , options = $.extend({}, $target.data(), $this.data())
      $target.timespinner(options)
      e.preventDefault()
    })
  })

}(window.jQuery);
