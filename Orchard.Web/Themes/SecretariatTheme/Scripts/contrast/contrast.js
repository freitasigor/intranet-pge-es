/*
* Constrat Resource
*http://www.brasil.gov.br/portal_javascripts/++resource++contraste.js?original=1
*
*/

var semaforo = 1;

//<![CDATA[
+function ($) {

    $(function () {


        $('.action-contraste').each(function () {

            $(this).click(
              function (e) {
                  if ($.cookie('contraste') === null) {
                      $.cookie('contraste', 'on');
                      $('body').addClass('contraste');
                      e.preventDefault();
                      return false;
                  } else {
                      if ($.cookie('contraste') == 'on') {
                          $.cookie('contraste', 'off');
                          $('body').removeClass('contraste');
                          e.preventDefault();
                          return false;
                      } else {
                          $.cookie('contraste', 'on');
                          $('body').addClass('contraste');
                          e.preventDefault();
                          return false;
                      }
                  }
              });
        });

        if ($.cookie('contraste') == 'on') {
            $('body').addClass('contraste');
            return false;
        }


    });
    


}(jQuery);
//]]>