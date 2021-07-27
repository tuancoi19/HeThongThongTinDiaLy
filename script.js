$(document).ready(function(){
    var format = 'image/png';
    var map;
    var minX = 102.107963562012;
    var minY = 8.30629825592041;
    var maxX = 109.505798339844;
    var maxY = 23.4677505493164;
    var cenX = (minX + maxX) / 2;
    var cenY = (minY + maxY) / 2;
    var mapLat = cenY;
    var mapLng = cenX;
    var mapDefaultZoom = 5.5;
    var points= new Array();
    var ishighlight = true;
    var showInfo=true;
    var navclose=false;
    var highlightLayer;
// display map
    var layerBG = new ol.layer.Tile({
        source: new ol.source.OSM({})
    });
    
    var layerVMM = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/example/wms?',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.1',
                'STYLES': '',
                'LAYERS': 'example:dan_so',
                'TILED': true,
            }
        })
    });
    var viewMap = new ol.View({
        center: ol.proj.fromLonLat([mapLng, mapLat]),
        zoom: mapDefaultZoom
    });
    map = new ol.Map({
        target: "map",
        layers: [layerBG, layerVMM],
        view: viewMap
    });
// styles
    var highlightStyle = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#696969'
            }),
            stroke: new ol.style.Stroke({
                color: 'white', 
                width: 2
            })
        }),
        'LineString': new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'none'
            }),
            stroke: new ol.style.Stroke({
                color: '#1E90FF', 
                width: 4
            })
        }),
        "Point": new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: '#1E90FF'
                }),
                stroke: new ol.style.Stroke({
                    color: '#1E90FF', 
                    width: 3
                }),
                radius: 1})
           }),
        'Polygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#00BFFF'
            }),
            stroke: new ol.style.Stroke({
                color: '#1E90FF', 
                width: 4
            })
        })
    };
    var style_smallest = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#FFFF00'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_smaller = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#FFD700'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_small = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#DAA520'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_big = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#F4A460'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_bigger = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#FF69B4'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_biggest = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#DC143C'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_tbb = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#00FFFF'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_dbb = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#FFC0CB'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_dbsh = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#FF0000'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_btb = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#00FF7F'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_dhntb = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#7B68EE'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_tn = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#800000'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_dnb = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#FFD700'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    var style_dbscl = {
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#191970'
            }),
            stroke: new ol.style.Stroke({
                color: 'none', 
                width: 1
            })
        })
    };
    highlightLayer = getvectorLayer(highlightStyle);
    map.addLayer(highlightLayer);
   
// events
    var mousePosition = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        target: "lon",
        undefinedHTML: '&nbsp;'
    });
    map.addControl(mousePosition);
    // 
   
    // 
    map.on('singleclick', function (evt) {
        if(showInfo){
            var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
            var lon = lonlat[0];
            var lat = lonlat[1];
            var myPoint = 'POINT(' + lon + ' ' + lat + ')';
            highLight(myPoint);
            displayifoObj(myPoint,evt);
        }
        // displaymulti(myPoint,"active");
        // resetLayer();
    });
    // 
    map.on('contextmenu',function(e){
        e.preventDefault();
        var lonlat = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
        var lon = lonlat[0];
        var lat = lonlat[1];
        var myPoint="";
        
        points.push([lon,lat]);
        console.log(points);
        if(points.length==1){
            for (var i = 0; i < points.length; i++) 
            myPoint = points[i][0] + ',' + points[i][1]; 
            geo=createJsonObj(myPoint,"Point");
        }
        myPoint = "["+points[0][0] + ',' + points[0][1]+"]";
        if(points.length==2){
            for (var i = 1; i < points.length; i++) 
            myPoint += ',['+points[i][0] + ',' + points[i][1]+"]"; 
            geo=createJsonObj(myPoint,"LineString");
        }
        if(points.length>2){
            for (var i = 1; i < points.length; i++) 
            myPoint += ',['+points[i][0] + ',' + points[i][1]+"]"; 
            myPoint="["+myPoint+"]";
            geo=createJsonObj(myPoint,"Polygon");
        }
        console.log(geo);
        highLightGeoJsonObj(geo);
        
        
        // displaydagger(myPoint,"active")
    })
    var geo="";
    $("#caculate").click(function(){
        if(points.length==2) caculate(geo,"line");
        if(points.length>2) caculate(geo,'polygon');

    })
    
    $("#reset").click(function(){
        highlightLayer.setSource();
        points.length=0;
    })
    function caculate(geo,code){
        
        $.ajax({
            type: "POST",
            url: "connect.php",
            //dataType: 'json',
            data: {function: 'caculate', paPoint: geo,code:code},
            success : function (result, status, erro) {
                
                console.log(result);
                alert("Kết quả: "+ result);
                
               
            },
            error: function (req, status, error) {
                alert(req + " " + status + " " + error);
            }
        });
    
    }
    $(document).bind("mousedown", function (e) {
    
        // If the clicked element is not the menu
        if (!$(e.target).parents(".custom-menu").length > 0) {
            highlightLayer.setSource(null);
            // Hide it
            $(".custom-menu").hide(100);
        }
    });
    $("#search").on('keyup',function(event){
        if (event.keyCode === 13) {
            var string= $("#search").val();
            string=titleCase(string);
            // searchforResult(string);
            searchforResult(string);
            
        };
    })
   $("input[type='radio']").on("change",function(){

        switch($(this).val()){
            case "normal": 
                resetLayer();
                map.addLayer(layerVMM);
                $("#ctds").hide();
                $("#ctmd").hide();
                $("#ctkv").hide();
                toggleHighlight();
                break;
            case "danSo":
                resetLayer();
                displaymulti("pop_1");
                $("#ctds").show(100);
                $("#ctmd").hide();
                $("#ctkv").hide();
                toggleHighlight();
                break;
            case "matDo":
                resetLayer();
                displaymulti("dens_1");
                $("#ctds").hide();
                $("#ctmd").show(100);
                $("#ctkv").hide();
                toggleHighlight();
                break;
            case "khuVuc":
                resetLayer();
                displaymulti("dist_1");
                $("#ctds").hide();
                $("#ctmd").hide();
                $("#ctkv").show(100);
                toggleHighlight();
                break;  
        }
   })
   $("#showInfo").on('change',function(){
    showInfo= !showInfo;
}) 
// functions
    function titleCase(str) {
        return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
    }

    function getvectorLayer(style){
        var styleFunction = function (feature) {
            return style[feature.getGeometry().getType()];
        };
        var vectorLayer = new ol.layer.Vector({
            style: styleFunction
        });
        return vectorLayer;
    }
    function createJsonObj(myPoint,type) {  
        console.log(type);                 
        var geojsonObject = ' {"type":"'+type+'","coordinates":['+myPoint+']}';
        return geojsonObject;
    }
    // function createJsonObj(result) {                    
    //     var geojsonObject = '{'
    //             + '"type": "FeatureCollection",'
    //             + '"crs": {'
    //                 + '"type": "name",'
    //                 + '"properties": {'
    //                     + '"name": "EPSG:4326"'
    //                 + '}'
    //             + '},'
    //             + '"features": [{'
    //                 + '"type": "Feature",'
    //                 + '"geometry": ' + result
    //             + '}]'
    //         + '}';
    //     return geojsonObject;
    // }
    function resetLayer(){
        var layerArray, len, layer;
        layerArray = map.getLayers().getArray(),
        len = layerArray.length;
        while (len > 0){
            layer = layerArray[len-1];
            map.removeLayer(layer);
            len = layerArray.length;
        }
        map.addLayer(layerBG);
        highlightLayer.setSource(null);
        
    }
    function drawGeoJsonObj(paObjJson, style) {
        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(paObjJson, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            })
        });
        var vectorLayer=getvectorLayer(style);
        vectorLayer.setSource(vectorSource);
        map.addLayer(vectorLayer);
    }
    function highLightGeoJsonObj(paObjJson){
        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(paObjJson, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            })
        });
        highlightLayer.setSource(vectorSource);
    }
    function toggleHighlight(){
        if(ishighlight){
            map.addLayer(highlightLayer);
        }
        else map.removeLayer(highlightLayer);
    }
    function dispalyinfo(result,x,y){
        
      
        $("#image").attr("src",'images/'+result[0]['image'])
        $("#tenTinhThanh").text("Tên tỉnh: "+result[0]['tenTinhThanh']);
        $("#danSo").text("Dân số (người): "+result[0]['danSo']);
        $("#dienTich").text("Diện tích (km2): "+result[0]['dienTich']);
        $("#matDo").text("Mật độ (người/km2): "+result[0]['matDo']);
        $("#khuVuc").text("Khu vực: "+result[0]['khuVuc']);
        $(".custom-menu").finish().toggle(100).
        css({
            top: x + "px",
            left: y + "px"
        });
    }
    function highLight(paPoint){
        $.ajax({
            type: "POST",
            url: "connect.php",
            data: {function: 'highlightObj', paPoint: paPoint},
            success : function (result, status, erro) {
                if(result!="null")
                highLightGeoJsonObj(result);
            },
            error: function (req, status, error) {
                alert(req + " " + status + " " + error);
            }
        });
    }
    function displayifoObj(paPoint,evt){
        $.ajax({
            type: "POST",
            url: "connect.php",
            data: {function: 'infoObj', paPoint: paPoint},
            success : function (result, status, erro) {
                
                if(result!="null"){
                 result=JSON.parse(result);   

                dispalyinfo(result,evt.pixel_[1],evt.pixel_[0]);
                }
                
            },
            error: function (req, status, error) {
                alert("kjasdja");
            }
        });
    }
    
    function displaymulti(code){
        $.ajax({
            type: "POST",
            url: "connect.php",
            data: {function: 'multiObj', code: code},
            success : function (result, status, erro) {
                // dispalyinfo(result);
              
                if(result!="null"){
                    
                    result=JSON.parse(result);
                    
                    for(var i=0; i<result.length;i++){
                        // if(result[i]['class']=="dagger")
                        switch(result[i]['class']){
                            case "smallest": 
                                drawGeoJsonObj(result[i]['geo'],style_smallest);
                                break;
                            case "smaller":
                                drawGeoJsonObj(result[i]['geo'],style_smaller);
                                break;
                            case "small":
                                drawGeoJsonObj(result[i]['geo'],style_small);
                                break;
                            case "big":
                                drawGeoJsonObj(result[i]['geo'],style_big);
                                break;
                            case "bigger": 
                                drawGeoJsonObj(result[i]['geo'],style_bigger);
                                break;
                            case "biggest": 
                                drawGeoJsonObj(result[i]['geo'],style_biggest);
                                break;
                            case "tbb": 
                                drawGeoJsonObj(result[i]['geo'],style_tbb);
                                break;
                            case "dbb": 
                                drawGeoJsonObj(result[i]['geo'],style_dbb);
                                break;
                            case "dbsh": 
                                drawGeoJsonObj(result[i]['geo'],style_dbsh);
                                break;
                            case "btb": 
                                drawGeoJsonObj(result[i]['geo'],style_btb);
                                break;
                            case "dhntb": 
                                drawGeoJsonObj(result[i]['geo'],style_dhntb);
                                break;
                            case "tn": 
                                drawGeoJsonObj(result[i]['geo'],style_tn);
                                break;
                            case "dnb": 
                                drawGeoJsonObj(result[i]['geo'],style_dnb);
                                break;
                            case "dbscl": 
                                drawGeoJsonObj(result[i]['geo'],style_dbscl);
                                break;
                        }   
                    } 
                }
                // drawGeoJsonObj(result,style_dagger); 
            },
            error: function (req, status, error) {
                alert("Lỗi!");
            }
        });
    }
    function searchforResult(string){


        $.ajax({
            type: "POST",
            url: "connect.php",
            data: {function: 'infofromname', paPoint: null, name: string},
            success : function (result, status, erro) {
                console.log(result);
                if(result!="null"){
                    result=JSON.parse(result);
                    highLightGeoJsonObj(result[0]['geo']);
                    dispalyinfo(result,0,0);
                }
                
                else alert("Tỉnh không tồn tại")
            },
            error: function (req, status, error) {
                alert(req + " " + status + " " + error);
            }
        });
    }
})