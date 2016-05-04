function headSticker(Scope, sortObj) {
    $('.sticky-thead').remove()
    $('table').each(function () {
        if ($(this).find('thead').length > 0 && $(this).find('th').length > 0) {

            // Clone <thead>
            var $t = $(this)

            $.each($t.find('thead').find('th'), function (_, item) {
                $(item).find('.thead-sort').remove()
                if ($(item).data('value')) {
                    if (sortObj.name == $(item).data('value')) {
                        if (sortObj.order == 'asc') {
                            $(item).html($(item).html() + '<i class="fa fa-sort-asc thead-sort" aria-hidden="true"></i>')
                        } else if (sortObj.order == 'desc') {
                            $(item).html($(item).html() + '<i class="fa fa-sort-desc thead-sort" aria-hidden="true"></i>')
                        }
                    } else {
                        $(item).html($(item).html() + '<i class="fa fa-sort thead-sort" aria-hidden="true"></i>')
                    }
                }
            })

            var $thead = $t.find('thead').clone(),
                $col = $t.find('thead, tbody').clone()
            // Add class, remove margins, reset width and wrap table
            var rightLength = $('#personal-info-right').innerWidth()
            var tableLength = $('table:visible').outerWidth()
            var width = ''
            if (tableLength < rightLength) {
                width = '100%'
            } else {
                width = '100%'
            }
            $t.addClass('sticky-enabled')
                .css({
                    margin: 0,
                    width: width
                })

            if ($t.hasClass('overflow-y')) $t.removeClass('overflow-y').parent().addClass('overflow-y')

            // Create new sticky table head (basic)
            $t.after('<table class="sticky-thead" />')

            // If <tbody> contains <th>, then we create sticky column and intersect (advanced)
            if ($t.find('tbody th').length > 0) {
                $t.after('<table class="sticky-col" /><table class="sticky-intersect" />')
            }

            // Create shorthand for things
            var $stickyHead = $(this).siblings('.sticky-thead'),
                $stickyCol = $(this).siblings('.sticky-col'),
                $stickyInsct = $(this).siblings('.sticky-intersect')


            $stickyHead.append($thead)

            $stickyCol
                .append($col)
                .find('thead th:gt(0)').remove()
                .end()
                .find('tbody td').remove()

            $stickyInsct.html('<thead><tr><th>' + $t.find('thead th:first-child').html() + '</th></tr></thead>')

            // Set widths
            var setWidths = function () {
                $t
                    .find('thead th').each(function (i) {
                        $stickyHead.find('th').eq(i).width($(this).width())
                    })
                    .end()
                    .find('tr').each(function (i) {
                    $stickyCol.find('tr').eq(i).height($(this).height())
                })

                // Set width of sticky table head
                $stickyHead.width($t.width())

                // Set width of sticky table col
                $stickyCol.find('th').add($stickyInsct.find('th')).width($t.find('thead th').width())
            }
            setWidths()

            if ($('thead:visible').eq(0).offset()) {
                var affix = $('.sticky-thead:visible')
                var scrollHeight = $(window).scrollTop()
                var theadHeight = $('thead:visible').eq(0).offset().top
                var listHeight = $('.sticky-enabled:visible').outerHeight()
                var topNavHeight = $('.navbar-fixed-top').outerHeight()
                if (scrollHeight + topNavHeight > theadHeight) {
                    affix.css({
                        top: scrollHeight - listHeight - theadHeight + topNavHeight
                    })
                } else {
                    affix.css({
                        top: -listHeight
                    })
                }
            }

            $('.admin-table .sticky-thead th').click(function () {
                var $item = $(this).find('i')
                var sortName = $item.parent().data('value')
                var sortTypeName = $item.parent().data('type')
                var that = this
                var sort = ''
                var paging = {}
                if (sortName) {
                    for (var key in Scope) {
                        if (key.indexOf('paging') > 0) {
                            paging = Scope[key]
                            break
                        }
                    }
                    $.each($(this).parent().find('th'), function (_, item) {
                        if (that !== item) {
                            $(item).find('i').removeClass('fa-sort-desc').removeClass('fa-sort-asc').addClass('fa-sort')
                        }
                    })
                    if ($item.hasClass('fa-sort') || $item.hasClass('fa-sort-asc')) {
                        $item.removeClass('fa-sort').removeClass('fa-sort-asc').addClass('fa-sort-desc')
                        sort = 'desc'
                    } else if ($item.hasClass('fa-sort-desc')) {
                        $item.removeClass('fa-sort-desc').addClass('fa-sort-asc')
                        sort = 'asc'
                    }
                    ES.event.fire(paging.id, 'change', {
                        name: sortName,
                        order: sort,
                        type: sortTypeName
                    })
                }
            })
        }
    })
}
module.exports = headSticker