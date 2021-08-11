$(document).ready(function () {
    menu()
  });

  function menu(){
    var buttonTxt;
    if(loggedIn){
        buttonTxt = "Connected";
    }
    else{
        buttonTxt = "START";
    }
    var menu = `<nav class="navbar navbar-expand-md navbar-light sticky-top">
                    <div class="container-fluid">
                        <span><strong>Crypto Kitties</strong></span>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="index.html"><strong>Home</strong></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="index.html"><strong>Market Place</strong></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="catalogue.html"><strong>Catalogue</strong></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="kFactory.html"><strong>K-Factory</strong></a>
                                </li>
                                <li class="nav-item">
                                    <button type="button" class="btn btn-success" onclick="start()">${buttonTxt}</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>`;

    $('#menu').html(menu);
  }
