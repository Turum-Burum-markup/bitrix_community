//mobile events
var clickHandler = 'click';
if('ontouchstart' in document.documentElement && (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    clickHandler = 'touchstart';
}

$(window).load(function() {
    $('.wrapper').addClass('show');
});


(function() {

    $('body').on('click', '.bitrix_btn', function(e) {
        e.preventDefault();
        var $this = $(this),
            $body = $('.bitrx_main');

        if($this.hasClass('bitrix_company')) {
            $body.addClass('company');
            setTimer($this);
        } else if ($this.hasClass('bitrix_community')) {
            $body.addClass('community');
            setTimer($this);
        }
        goToLand();
    });

    function goToLand() {
        $('.title').addClass('fadeOut');
        $('.bitrix_btn').addClass('fadeOut');
        $('.post.fadeIn').addClass('fadeOut');
    }
    function setTimer($this) {
        window.setTimeout(function(){
            window.location.href = $this.attr('href');
        }, parseInt($this.data('timeout-open'),10));
    }
}());

$(function () {
     $('a[href*=#]').bind(clickHandler, function(scrolling) {
         var anchor = $(this);
         $('html, body').stop().animate({
         scrollTop: $(anchor.attr('href')).offset().top - $('.header_wrap').innerHeight()}, 500);
     scrolling.preventDefault();
     });
 });

// Function which Open|sClose list of items
(function() {
    var currentText = $('.toggle_cap_btn').text();
    $('body').on('click','.list_item_cap.list_btn', function(e) {

        var appendText = $('.toggle_cap_btn').data('otherText'),
            innerWidth = window.innerWidth,
            capsList = $('.cap_side_wrap').find('.list_cap_wrap');
        e.preventDefault();

        if($('.hidens_items').is(':hidden')) {
            $('.hidens_items').show(0);
            $('.toggle_cap_btn').find('.txt').text(appendText);
            $('.list_item_cap.list_btn').addClass('active');
        } else if ($('.hidens_items').is(':visible') && innerWidth >= 768) {
            $('html,body').animate({scrollTop: $('.cap_side_wrap').offset().top - $('.header_wrap').height()},300);
            $('.hidens_items').hide();
            $('.toggle_cap_btn').find('.txt').text(currentText);
            $('.list_item_cap.list_btn').removeClass('active');

        } else if ($('.hidens_items').is(':visible')) {
            $('html,body').animate({scrollTop: $('.hidens_items').offset().top - $('.header_wrap').height()},300);
            $('.hidens_items').hide();
            $('.toggle_cap_btn').find('.txt').text(currentText);
            $('.list_item_cap.list_btn').removeClass('active');
        }
    });
})();

//sticky header and waypoint
(function() {

    var nav_container = $('.header');
    var nav = $('.header_wrap');

    var top_spacing = 0;
    var waypoint_offset = 50;

    nav_container.waypoint({
        handler: function(event, direction) {

            if (direction == 'down') {
                nav_container.css({ 'height':nav.outerHeight() });
                nav.addClass('sticky').css('top',0);
            } else {
                nav.stop(true, true).removeClass('sticky').css('top',0);
            }

        },
        offset: function() {
            return top_spacing-1;
        }
    });

    nav_container.css({ 'height':nav.outerHeight() });

    $(window).resize(function() {
        nav_container.css({ 'height': nav.outerHeight() });
    });

    var sections = $('.section_for_nav');
    var navigation_links = $('.navigation a');

    sections.waypoint({
        handler: function(event, direction) {

            var active_section = $(this);
            if (direction === 'up') active_section = active_section.prev();

            var active_link = $('.navigation a[href="#' + active_section.attr("id") + '"]');
            navigation_links.removeClass('active');
            active_link.addClass('active');
        },
        offset: '25%'
    });
}());

//show on scroll
$(function() {

    var $window           = $(window),
        win_height_padded = $window.height() * 1.3;

    $window.on('scroll', revealOnScroll);

    function revealOnScroll() {
        var scrolled = $window.scrollTop(),
            win_height_padded = $window.height() * 0.9;

        // Showed...
        $('.revealOnScroll:not(.animated)').each(function () {
            var $this     = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded > offsetTop) {
                if ($this.data('animation-second')) {
                    $this.addClass($this.data('animation') + ' animated');
                    window.setTimeout(function () {
                        $this.addClass('animated ' + $this.data('animation-second'));
                    }, parseInt($this.data('timeout'), 10));
                } else if ($this.data('timeout')) {
                    window.setTimeout(function() {
                        $this.addClass('animated ' + $this.data('animation'));
                    }, parseInt($this.data('timeout'),10));
                } else {
                    $this.addClass('animated ' + $this.data('animation'));
                }
            }
        });
    }
    revealOnScroll();
});