(function(){$(function(t){t("#get-another-quote-button").on("click",function(e){e.preventDefault(),t.ajax({url:"http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",success:function(e){var n;n=e.shift(),t("#quote-title").text(n.title),t("#quote-content").html(n.content),t("#tweet").on("click",function(){t(this).attr("href","https://twitter.com/intent/tweet?text="+encodeURIComponent(t("#quote-content").text())+"- "+t("#quote-title").text())})},cache:!1})})})}).call(this);