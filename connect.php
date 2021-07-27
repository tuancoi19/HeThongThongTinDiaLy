<?php

    $paPDO = initDB();
    $paSRID = '4326';
    
    $functionname = $_POST['function'];
    switch($functionname){
        case 'highlightObj':
            getGeotoHighlight($paPDO, $paSRID);
            closeDB($paPDO);
            break;
        case 'multiObj':
            getmultiObj($paPDO, $paSRID);
            closeDB($paPDO);
            break;
    
        case 'infoObj':
            getinfoObj($paPDO, $paSRID);
            closeDB($paPDO);
            break;
            
        case 'infofromname':
            getinfofromname($paPDO);
            CloseDB($paPDO);
            break;

        case 'caculate':
            caculate($paPDO,$paSRID);
            CloseDB($paPDO);
            break;
        // default:
        // closeDB($paPDO);
    }
    

    function initDB()
    {
        // Kết nối CSDL
        $paPDO = new PDO('pgsql:host=localhost;dbname=postgres;port=5432', 'postgres', '123');
        return $paPDO;
    }
    function query($paPDO, $paSQLStr)
    {
        try
        {
            // Khai báo exception
            $paPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Sử đụng Prepare 
            $stmt = $paPDO->prepare($paSQLStr);
            // Thực thi câu truy vấn
            $stmt->execute();
            
            // Khai báo fetch kiểu mảng kết hợp
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            
            // Lấy danh sách kết quả
            $paResult = $stmt->fetchAll();   
            return $paResult;                 
        }
        catch(PDOException $e) {
            echo "Thất bại, Lỗi: " . $e->getMessage();
            return null;
        }       
    }
    function closeDB($paPDO)
    {
        // Ngắt kết nối
        $paPDO = null;
    }
    function caculate($paPDO,$paSRID){
        $geojson= $_POST['paPoint'];
        $code=$_POST['code'];
        if($code=='line')
            $mySQLStr="SELECT ST_Length(ST_GeomFromGeoJSON('$geojson'),false) as length";
        else $mySQLStr="SELECT ST_area(ST_GeomFromGeoJSON('$geojson')) as length";
        $result = query($paPDO, $mySQLStr);
        if ($result != null)
        {
            // $res= array();
            foreach ($result as $item){
                // $res[] = array("geo"=> $item['geo']);
                echo $item['length'];
            }
            // echo json_encode( $res) ;
        }else echo "null";
    }
    function getGeotoHighlight($paPDO, $paSRID){
        $paPoint = $_POST['paPoint'];
        $paPoint = str_replace(',', ' ', $paPoint);
        $mySQLStr = "SELECT ST_AsGeoJson(geom) as geo from \"dan_so\" where ST_Within('SRID=".$paSRID.";".$paPoint."'::geometry,geom)";
        $result = query($paPDO, $mySQLStr);
    
        if ($result != null)
        {
            $res=null;
            foreach ($result as $item){
                $res= $item['geo'];
            }
            echo $res ;
        }else echo "null";
    }
    function getinfoObj ($paPDO, $paSRID){
        $paPoint = $_POST['paPoint'];
        $paPoint = str_replace(',', ' ', $paPoint);
        $mySQLStr = "SELECT name_1, pop_1, area_1, dens_1, dist_1, img_1  from \"dan_so\" where ST_Within('SRID=".$paSRID.";".$paPoint."'::geometry,geom)";
        $result = query($paPDO, $mySQLStr);
        if ($result != null)
        {   
            $res= array();
           
            foreach ($result as $item){
                $res[]=array("tenTinhThanh" => $item['name_1'],"danSo"=>$item['pop_1'],"dienTich"=>$item['area_1'],"matDo"=>$item['dens_1'],"khuVuc"=>$item['dist_1'],"image"=>$item['img_1']);
                // return ( $item['geo']);
                // echo($item['geo']);
                // echo "<br>";
                
            }
            echo json_encode($res);
            // return $res;
            
        }else echo "null";
    }
    function getmultiObj($paPDO, $paSRID){
       
        $code=$_POST['code'];
        $mySQLStr = "SELECT $code, ST_AsGeoJson(geom) as geo from \"dan_so\"  ";
        $result = query($paPDO, $mySQLStr);
        if ($result != null)
        {   
            $res= array();
            if($code=="pop_1"){
                foreach ($result as $item)
                {
                    if(500001>$item['pop_1']) 
                    $res[]=array("geo"=>$item['geo'],"class"=>"smaller");
                    if(1000001>$item['pop_1'] && $item['pop_1']>500000) 
                    $res[]=array("geo"=>$item['geo'],"class"=>"small");
                    if(1500001>$item['pop_1'] && $item['pop_1']>1000000) 
                    $res[]=array("geo"=>$item['geo'],"class"=>"big");
                    if(5000001>$item['pop_1'] && $item['pop_1']>1500000) 
                    $res[]=array("geo"=>$item['geo'],"class"=>"bigger");
                    if($item['pop_1']>5000000) 
                    $res[]=array("geo"=>$item['geo'],"class"=>"biggest"); 
                }
                echo json_encode($res);
            }
            if($code=="dist_1"){
                foreach ($result as $item)
                {
                    if($item['dist_1']=='Đồng bằng sông Hồng') 
                    $res[]=array("geo"=>$item['geo'],"class"=>"dbsh");
                    if($item['dist_1']=='Đông Bắc Bộ') 
                    $res[]=array("geo"=>$item['geo'],"class"=>"dbb");
                    if($item['dist_1']=='Tây Bắc Bộ') 
                    $res[]=array("geo"=>$item['geo'],"class"=>"tbb");
                    if($item['dist_1']=='Bắc Trung Bộ') 
                    $res[]=array("geo"=>$item['geo'],"class"=>"btb");
                    if($item['dist_1']=='Duyên hải Nam Trung Bộ') 
                    $res[]=array("geo"=>$item['geo'],"class"=>"dhntb");
                    if($item['dist_1']=='Tây Nguyên') 
                    $res[]=array("geo"=>$item['geo'],"class"=>"tn");
                    if($item['dist_1']=='Đông Nam Bộ') 
                    $res[]=array("geo"=>$item['geo'],"class"=>"dnb");
                    if($item['dist_1']=='Đồng bằng sông Cửu Long') 
                    $res[]=array("geo"=>$item['geo'],"class"=>"dbscl");
                }
                echo json_encode($res);
            }
            if($code=="dens_1"){
                foreach ($result as $item)
                {
                    if($item['dens_1']<101) 
                    $res[]=array("geo"=>$item['geo'],"class"=>"smallest");
                    if(201>$item['dens_1'] && $item['dens_1']>100) 
                    $res[]=array("geo"=>$item['geo'],"class"=>"smaller");
                    if(501>$item['dens_1'] && $item['dens_1']>200) 
                    $res[]=array("geo"=>$item['geo'],"class"=>"small");
                    if(1001>$item['dens_1'] && $item['dens_1']>500) 
                    $res[]=array("geo"=>$item['geo'],"class"=>"big");
                    if(2001>$item['dens_1'] && $item['dens_1']>1000) 
                    $res[]=array("geo"=>$item['geo'],"class"=>"bigger");
                    if($item['dens_1']>2000) 
                    $res[]=array("geo"=>$item['geo'],"class"=>"biggest");
                }
                echo json_encode($res);
            }
        }else echo "null";
    }
    function getinfofromname($paPDO){
        $name=$_POST['name'];
        $mySQLStr = "SELECT name_1, pop_1, area_1, dens_1, dist_1, img_1, ST_AsGeoJson(geom) as geo from \"dan_so\" where name_1 Like '$name%'or varname_1 Like '$name%'LIMIT 1 ";
        $result = query($paPDO, $mySQLStr);
        if ($result != null)
        {
            $res= array();
            foreach ($result as $item){
                $res[]=array("geo" => $item['geo'],"tenTinhThanh" => $item['name_1'],"danSo"=>$item['pop_1'],"dienTich"=>$item['area_1'],"matDo"=>$item['dens_1'],"khuVuc"=>$item['dist_1'],"image"=>$item['img_1']);
            }
            echo json_encode($res)  ;
        }else echo "null";
    }
?>