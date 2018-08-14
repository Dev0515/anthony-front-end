$( document ).ready(function() {
    $('ul.tab-nav li a.button').click(function() {

        /* var id = $(this).parent().attr('id');
        
        var add_href;

        switch (id) {
            case 'profile':
                add_href = "#one";
                break;
            case 'status':
                add_href = "#two";
                break;
            case 'discussion':
                add_href = "#three";
                break;
            case 'alert':
                add_href = "#four";
                break;
            case 'shop':
                add_href = "#five";
                break;       
        }
    
        $(this).attr("href", add_href);  */

        var href = $(this).attr('href');

        $('li a.active.button', $(this).parent().parent()).removeClass('active');
        $(this).addClass('active');

        $('.tab-pane.active', $(href).parent()).removeClass('active');
        $(href).addClass('active');

        return false;
    });
});