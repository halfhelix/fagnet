var masonrySettings = {
    wrapperSelector: '.grid',
    itemSelector: '.grid__item',
    columnsNumber: 3,
    marginItemPersent: 1,
    firstRebild: true
}

$(document).ready(function() {

    // mailchimp form submission
    // $("#mc-form").formchimp({
    //     // sucesss
    //     // error
    // });


    //simple-tabs
    initTabs();


    if ($(".place-single__map").length > 0) {
        $(".place-single__map").stick_in_parent();
    }
    masonry(masonrySettings);

    //show hide on sucsess
    // $(document).on('mailChimpSuccess', function() {
    //     $('#mc-form').hide();
    //     $('.sucsess').css('visibility', 'visible').hide().fadeIn('slow');
    // });

});

function masonry(masonry) {
    var $wrapper = $(masonry.wrapperSelector),
        $items = $(masonry.itemSelector),
        wrapperInnerWidth,
        wrapperBorderWidth,
        wrapperPaddingWidth,
        itemWidth,
        itemMarginWidth;


    wrapperBorderWidth = parseInt($wrapper.css('border-left-width'));
    //wrapperPaddingWidth = parseInt($wrapper.css('padding-left'));
    //wrapperPaddingWidth = 0;
    wrapperInnerWidth = parseInt($wrapper.width()) - wrapperBorderWidth * 2;
    itemMarginWidth = wrapperInnerWidth * masonry.marginItemPersent / 100;
    columnWidth = wrapperInnerWidth / masonry.columnsNumber;
    itemWidth = columnWidth - itemMarginWidth * 2;

    $items.css('width', itemWidth);
    $items.css('margin-left', itemMarginWidth);

    $wrapper.masonry({
        // options
        itemSelector: masonry.itemSelector,
        columnWidth: columnWidth,
        originLeft: true
    });
}

function initTabs() {
    $('.tabs').find('a').on('click', function() {
        if (!$(this).hasClass('tab--active')) {
            $('.tab--active').removeClass('tab--active');
            $(this).addClass('tab--active');
            $('.tab-content--active').removeClass('tab-content--active');
            $('.' + $(this).attr('data-tab')).addClass('tab-content--active');
            if (($(this).attr('data-tab') === 'grid') && (masonrySettings.firstRebild)) {
                masonry(masonrySettings);
                masonrySettings.firstRebild = false;
            }

        }
        return false;
    });
}