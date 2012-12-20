$(function () {

    module("bootstrap-timespinner")

      test("should provide no conflict", function () {
        var timespinner = $.fn.timespinner.noConflict()
        ok(!$.fn.timespinner, 'timespinner was set back to undefined (org value)')
        $.fn.timespinner = timespinner
      })

      test("should be defined on jquery object", function () {
        ok($(document.body).timespinner, 'timespinner method is defined')
      })

})
