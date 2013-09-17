<?php
class Upload{
	var $root = '';
	var $dir = '/upload/' ;
	var $maxSize = 1000000000 ;
	var $allowedExt;
	var $fileInfo = array();
 	private $error = array();
 
 	public function __construct($root){
 		$this->root = $root ;
 	}
 	
	public function error(){
		return $this->error;
	}
	
	function config($maxSize,$allowedExt){
		$this->maxSize = $maxSize;
		$this->allowedExt = $allowedExt;
	}
 
	function generateRandStr($length){
 	   $randstr = "";
       for($i=0; $i< $length; $i++){
         $randnum = mt_rand(0,61);
         if($randnum < 10){
            $randstr .= chr($randnum+48);
         }else if($randnum < 36){
            $randstr .= chr($randnum+55);
         }else{
            $randstr .= chr($randnum+61);
         }
      }
      return $randstr;
   }
 
	function check($uploadName){
		if(isset($_FILES[$uploadName])){
			$this->fileInfo['ext'] = substr(strrchr($_FILES[$uploadName]["name"], '.'), 1);
			$this->fileInfo['name'] = basename($_FILES[$uploadName]["name"]);
			$this->fileInfo['size'] = $_FILES[$uploadName]["size"];
			$this->fileInfo['temp'] = $_FILES[$uploadName]["tmp_name"]; 
			if($this->fileInfo['size']< $this->maxSize){
				if(strlen($this->allowedExt)>0){
					$exts = explode(',',$this->allowedExt);
					if(in_array($this->fileInfo['ext'],$exts)){
						return true;
					}
					$this->error = array('errorno'=>3, 'errorstring' => 'Upload file type is not allowed');
					return false;
				}
				return true;
			}else{
				$this->error = array('errorno'=>2, 'errorstring' => 'Upload file is to big');
				return false;
			}
		}
		$this->error = array('errorno'=>1, 'errorstring' => 'No upload file found');
		return false;
	}
 
	function upload($name,$dir='',$fname=false){
		$path = $this->dir . $dir ;
		$dir = $this->root . $path ;
		if(!is_dir($dir)){
			return false;
		}
		if($this->check($name)){
			if(!$fname){
				$this->fileInfo['fname'] = $this->generateRandStr(15).'.'.$this->fileInfo['ext'];
				while(file_exists($dir.$this->fileInfo['fname'])){
					$this->fileInfo['fname'] = $this->generateRandStr(15).'.'.$this->fileInfo['ext'];
				}				
			}else{
				$this->fileInfo['fname'] = $fname;
			}
			if(move_uploaded_file($this->fileInfo['temp'], $dir.$this->fileInfo['fname'])){
				$file = new fileModel();
				$id = $file->create(array(
						'oldname'	=>	$this->fileInfo['name'],
						'name'		=>	$this->fileInfo['fname'],
						'ext'		=>	$this->fileInfo['ext'],
						'size'		=>	$this->fileInfo['size'],
						'path'		=>	$path
						));
				return $id ;
			}else{
				$this->error = array('errorno'=>4, 'errorstring' => 'upload errors');
				return false;
			}
		}else{
			return false;
		}
	}
 
}
?>
