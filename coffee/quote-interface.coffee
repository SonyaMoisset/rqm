$ ($) ->
  $('#get-another-quote-button').on 'click', (e) ->
    e.preventDefault()
    $.ajax
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'

      success: (data) ->
        quote = data.shift()
        $('#quote-title').text quote.title
        $('#quote-content').html quote.content

        $('#tweet').on 'click', ->
          $(this).attr 'href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent($('#quote-content').text()) + '- ' + $('#quote-title').text()
          return
        return

      cache: false
    return
  return
