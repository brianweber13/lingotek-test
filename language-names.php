<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Recent Pins</title>

    <!-- bootstrap -->
    <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"
          integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb"
          crossorigin="anonymous">

    <!-- custom css for bootstrap theme 'cover' -->
    <link href="cover.css" rel="stylesheet">
  </head>
  <body>
    <div class="site-wrapper">
      <div class="site-wrapper-inner">
        <div class="cover-container">
          <div class="inner cover">
            <h1>Language Names</h1>

              <?php
              // why php?
              //   - easily get files
              //   - has tools to decode jsons, and then you can use them
              //     like objects
              
              $countries_json = file_get_contents("http://gmc.lingotek.com/language");
              $countries = json_decode($countries_json);
              foreach ($countries as $country){
                print('<p class="lead">' . $country->language . '</p>');
              }
              ?>

          </div>
        </div>
      </div>
    </div>
  </body>
</html>
