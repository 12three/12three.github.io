###инициализация сайдбара###
$('.main').scrollNav
    insertLocation: 'insertBefore'
    showHeadline: false
    showTopLink: false
    fixedMargin: 40
    sectionElem: 'div'

$('#test-load-button').on 'click', ->
        $(this).toggleClass 'b-button--load'
