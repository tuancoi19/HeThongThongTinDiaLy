<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/build/ol.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/css/ol.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body class="container-fluid">
    <div class="row" id="main">
        <div id="map">
        <ul class='custom-menu'>
            <li>
                <img id="image" src="" width="150" height="150" style="text-align:center;">
            </li>
            <li id="tenTinhThanh" >First thing</li>
            <li id="danSo" >Second thing</li>
            <li id="dienTich" >Third thing</li>
            <li id="matDo" >Third thing</li>
            <li id="khuVuc" >Third thing</li>
        </ul>
        <ul id="Sidenav">
            <!-- <li> <a href="javascript:void(0)" id="closebtn">&times;</a></li>  -->
            <li > <input type="text" name="search" id="search" placeholder="Tìm theo tỉnh ..." class="form-control">  </li>
            <li >
                <div>Hiển thị biểu đồ</div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="tenTinhThanh" value="normal" checked>
                    <label class="form-check-label" for="tenTinhThanh">
                        Tỉnh thành Việt Nam
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="danSo" value="danSo" >
                    <label class="form-check-label" for="danSo">
                        Theo tổng dân số
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="matDo" value="matDo">
                    <label class="form-check-label" for="matDo">
                        Theo mật độ
                    </label>
                </div>
                <div class="form-check ">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="khuVuc" value="khuVuc"  >
                    <label class="form-check-label" for="khuVuc">
                        Theo khu vực 
                    </label>
                </div>
            </li>
            <li>
                <div>Tính khoảng cách hoặc diện tích được chọn</div>
                <div>
                    <button id="caculate">Tính toán</button>
                    <button id="reset">Reset</button>
                </div>
            <li>
            <li>
                <div>Chức năng</div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="showInfo" checked>
                    <label class="form-check-label" for="showInfo">
                        Hiển thị thông tin vùng 
                    </label>
                </div>
            </li>
            <li id="ctds">
                <div>Chú thích</div>
                <div>Dân số (đơn vị: người)</div>
                <div><div class='box smaller'></div>: Dưới 500 000</div>
                <div><div class='box small'></div>: Từ 500 000 - 1 000 000</div>
                <div><div class='box big'></div>: Từ 1 000 000 - 1 500 000</div>
                <div><div class='box bigger'></div>: Từ 1 500 000 - 5 000 000</div>
                <div><div class='box biggest'></div>: Trên 5 000 000</div>
            </li>

            <li id="ctmd">
                <div>Chú thích</div>
                <div>Mật độ (đơn vị: người/km<sup>2</sup>)</div>
                <div><div class='box smallest'></div>: Dưới 100</div>
                <div><div class='box smaller'></div>: Từ 100 - 200</div>
                <div><div class='box small'></div>: Từ 200 - 500</div>
                <div><div class='box big'></div>: Từ 500 - 1000</div>
                <div><div class='box bigger'></div>: Từ 1000 - 2000</div>
                <div><div class='box biggest'></div>: Trên 2000</div>
            </li>

            <li id="ctkv">
                <div>Chú thích</div>
                <div>Khu vực</div>
                <div><div class='box tbb'></div>: Tây Bắc Bộ</div>
                <div><div class='box dbb'></div>: Đông Bắc Bộ</div>
                <div><div class='box dbsh'></div>: Đồng bằng sông Hồng</div>
                <div><div class='box btb'></div>: Bắc Trung Bộ</div>
                <div><div class='box dhntb'></div>: Duyên hải Nam Trung Bộ</div>
                <div><div class='box tn'></div>: Tây Nguyên</div>
                <div><div class='box dnb'></div>: Đông Nam Bộ</div>
                <div><div class='box dbscl'></div>: Đồng bằng sông Cửu Long</div>
            </li>
            </li>
        </ul>
        <span id="lon"></span>
        </div>
    </div>
       
</body>
    <script src="script.js" ></script>
</html>