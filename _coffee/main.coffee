###инициализация сайдбара###
$('.main').scrollNav
  insertLocation: 'insertBefore'
  showHeadline: false
  showTopLink: false
  fixedMargin: 40
  sectionElem: 'div'

$('#test-load-button').on 'click', ->
  $(this).toggleClass 'b-button--load'

tinymce.init
  selector:'.b-form-section__editable-textarea'
  menubar: false
  statusbar: false
  plugins : 'lists'
  toolbar: 'bold italic underline bullist numlist'
  theme: "modern"
  skin: 'light'
  content_style: 'body{font-family: Open Sans,Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;color: #464b4f} .mce-content-body{ height: 92px; margin: 8px 12px;} .mce-content-body p { margin: 0 }.mce-edit-area label {color: red !important; left: 5px !important;}'
  setup:  (editor) ->
    editor.on 'init', ->
      body = editor.getBody()
      isFocused = false
      $(body).on 'blur', (e) =>
        $(editor.contentAreaContainer).removeClass 'focus'
        isFocused = false
      $(body).on 'focus', (e) =>
        if isFocused then return
        $(editor.contentAreaContainer).addClass 'focus'
        isFocused = true
