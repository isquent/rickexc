<?php
class RestRequest  
{  
    protected $url;  
    protected $verb;  
    protected $requestBody;  
    protected $requestLength;  
    protected $username;  
    protected $password;  
    protected $acceptType;  
    protected $responseBody;  
    protected $responseInfo;  
  
    public function __construct ($url = null, $verb = 'GET', $requestBody = null)  
    {  
        $this->url               = $url;  
        $this->verb              = $verb;  
        $this->requestBody       = $requestBody;  
        $this->requestLength     = 0;  
        $this->username          = null;  
        $this->password          = null;  
        $this->acceptType        = 'application/json';  
        $this->responseBody      = null;  
        $this->responseInfo      = null;  
  
        if ($this->requestBody !== null)  
        {  
            $this->buildPostBody();  
        }  
    }  
  
    public function flush ()  
    {  
        $this->requestBody       = null;  
        $this->requestLength     = 0;  
        $this->verb              = 'GET';  
        $this->responseBody      = null;  
        $this->responseInfo      = null;  
    }  
  
    public function execute ()  
    {  
  
    }  
  
    public function buildPostBody ($data = null)  
    {  
	    $data = ($data !== null) ? $data : $this->requestBody;  
  
	    if (!is_array($data))  
	    {  
	        throw new InvalidArgumentException('Invalid data input for postBody.  Array expected');  
	    }  
  
	    $data = http_build_query($data, '', '&');  
	    $this->requestBody = $data;    
    }  
  
    protected function executeGet ($ch)  
    {         
  
    }  
  
    protected function executePost ($ch)  
    {  
  
    }  
  
    protected function executePut ($ch)  
    {  
  
    }  
  
    protected function executeDelete ($ch)  
    {  
  
    }  
  
    protected function doExecute (&$curlHandle)  
    {  
  
    }  
  
    protected function setCurlOpts (&$curlHandle)  
    {  
  
    }  
  
    protected function setAuth (&$curlHandle)  
    {  
  
    }  
}  
?>