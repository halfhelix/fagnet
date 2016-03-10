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

    installMassonrySettings();

    var $wrapper = $(masonry.wrapperSelector),
        $items = $(masonry.itemSelector),
        wrapperInnerWidth,
        wrapperBorderWidth,
        wrapperPaddingWidth,
        itemWidth,
        itemMarginWidth;

    if ($wrapper.length > 0) {

        wrapperBorderWidth = parseInt($wrapper.css('border-left-width'));
        wrapperInnerWidth = Math.floor(parseInt($wrapper.width()) - wrapperBorderWidth * 2);
        itemMarginWidth = Math.floor(wrapperInnerWidth * masonry.marginItemPersent / 100);
        columnWidth = Math.floor(wrapperInnerWidth / masonry.columnsNumber);
        itemWidth = Math.floor(columnWidth - 1 - itemMarginWidth * 2);

        $items.css('width', itemWidth);
        $items.css('margin-left', itemMarginWidth);
        //console.log('margin:' + itemMarginWidth, 'column:' + columnWidth, 'col:' + itemWidth, 'aaa:' + wrapperInnerWidth + '=' + columnWidth * 3);

        $wrapper.masonry({
            itemSelector: masonry.itemSelector,
            columnWidth: columnWidth,
            originLeft: true
        });
    }
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

function installMassonrySettings() {

    if (window.innerWidth >= 1300) {

        masonrySettings.columnsNumber = 3;
        masonrySettings.marginItemPersent = 1;

    } else if ((window.innerWidth < 1300) && (window.innerWidth >= 800)) {

        masonrySettings.columnsNumber = 2;
        masonrySettings.marginItemPersent = 2;

    } else if (window.innerWidth < 800) {

        masonrySettings.columnsNumber = 1;
        masonrySettings.marginItemPersent = 6;

    }
}

function initFilterLogic() {

    var $filter = $('.filter-layout');
    if ($filter.length > 0) {
        $('.main-header').find('.empty-block').on('click', function() {
            $filter.removeClass('filter-layout--hidden');
        });
        $('.filter-layout').find('.close-button').on('click', function() {
            $filter.addClass('filter-layout--hidden');
        });
        $('.filter-lists__item').liveFilter('.filter__input', 'li', {
            filterChildSelector: 'a'
        });
    }
}

function initFlyMenu() {
    $('.fly-menu').find('a').on('click', function() {
        if ($(this).hasClass('menu-item--active')) {
            $('.menu-item--active').removeClass('menu-item--active');
            $('.fly-menu-content--active').removeClass('fly-menu-content--active');
        } else {
            $('.menu-item--active').removeClass('menu-item--active');
            $(this).addClass('menu-item--active');
            $('.fly-menu-content--active').removeClass('fly-menu-content--active');
            $('.' + $(this).attr('data-fly-content')).addClass('fly-menu-content--active');
        }
        return false;
    });
}

function initEvents() {
    $(document).ready(function() {
        //simple-tabs
        initTabs();
        initFlyMenu();

        if ($(".place-single__map").length > 0) {
            $(".place-single__map").stick_in_parent();
        }
        masonry(masonrySettings);
        initFilterLogic();
    });

    $(window).resize(function() {
        masonry(masonrySettings);

    });
}

initEvents();