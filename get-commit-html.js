const Convert = require('ansi-to-html')
const convert = new Convert()

module.exports = async function getCommitHTML (commit, commits, { prefix = '' } = {}) {
  const diff = commit.diff
  if (!diff) return ''
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hn-history</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <style>
      #toggle-theme{
        position: fixed;
        top: 1em;
        right: 1em;
        z-index: 10000;
      }
      #repo{
        position: fixed;
        top: 3em;
        right: 1em;
        z-index: 10000;
      }
      #post{
        position: fixed;
        top: 5em;
        right: 1em;
        z-index: 10000;
      }
    </style>
  </head>
  <body>
    <div class="container-xl">
      <div id="toggle-theme">☼</div>
      <div id="repo"><a href="https://github.com/tg-z/hn-history" target="_blank">github</a></div>
      <div id="post"><a href="https://cri.dev/posts/2020-11-06-Tracking-HackerNews-history-in-git/" target="_blank">blog post</a></div>
      <div class="row">
        <div class="col-md-5" style="max-height: 100vh; overflow-y: scroll">
          ${commits.map(c => `<div>
            <a href="${prefix}/${c.hash}.html" data-toggle="tooltip" data-placement="top" title="${c.message + '\n' + c.date + '\n' + c.author_name}">${c.hash}</a>
          </div>`).join('')}
        </div>
        <div class="col-md-7" style="max-height: 100vh; overflow-y: scroll">
          <pre>${convert.toHtml(diff)}</pre>
        </div>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
    <script type="text/javascript">
      $(function () {
        console.log(window.localStorage.getItem('black'))
        if (window.localStorage.getItem('black')) document.body.style.background='black'
        $('[data-toggle="tooltip"]').tooltip()
        $('#toggle-theme').click(function () {
          const black = !window.localStorage.getItem('black')
          console.log('toggle', black)
          if (black) {
            document.body.style.background='black'
            window.localStorage.setItem('black',black)
          } else {
            document.body.style.background='white'
            window.localStorage.removeItem('black')
          }
        })
      })
    </script>
  </body>
  </html>
  `
}
