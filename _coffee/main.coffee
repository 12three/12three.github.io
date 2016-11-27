###инициализация сайдбара###
$('.main').scrollNav
    insertLocation: 'insertBefore'
    showHeadline: false
    showTopLink: false
    fixedMargin: 40

$('#test-load-button').on 'click', ->
        $(this).toggleClass 'b-button--load'

