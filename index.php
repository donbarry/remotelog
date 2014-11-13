<?php

// error_reporting(0);

header('Content-Type: application/json');

// 295ea6b44fca31cc
	class api_logger {

		protected $connection;
		private $superAdminKey = "!*f*lT2fKV7*Pl!5*S2U3WH&Tdkayo2nBxgjCKM7LN^Jh##bfIJsrloMFyvgTJyt";
		private $isSuperAdmin = false;

		protected $apiKey;
		protected $plan;
		protected $service;

		protected $isPost;

		protected $response = array();

		protected $debug = false;

		public function __construct() {

			$this->isPost = $_SERVER['REQUEST_METHOD'] === 'POST';

			$this->debug = $this->checkParamExists('debug');


			//$this->connection=mysqli_connect("127.0.0.1","root","it354db","api_logger_class");
			// Check connection
			// if (mysqli_connect_errno()) {
			// 	$this->error("connection to database failed");
			// }

			//$this->connection->close();
			//$this->storeLog();
			$this->response();

		}

		private function storeLog() {
			$param="debug";
			if ($this->checkParamExists($param)) {
				$output= $this->isPost ? $_POST[$param] : $_GET[$param];
				$this->$response["output"]=array($output);
				return true;
			}
			else {
				return false;
			}
		}

		protected function error($errorMsg) {
			echo '{"error": "'.$errorMsg.'"}';
			die();
		}

		protected function msgLog($msg,$key=null) {
			if ($this->debug === true) {
				if ($key===null) {
					$key=$this->getTimestamp();
				}

				$logMsg = array($key=>$msg);

				if (isset($this->response["debug"])) {
					array_push($this->response["debug"], $logMsg);
				}
				else {
					$this->response["debug"]=array($logMsg);
				}
			}
		}

		private function getParam($param) {
			if ($this->checkParamExists($param)) {
				return $this->isPost ? $_POST[$param] : $_GET[$param];
			}
			else {
				return false;
			}
		}

		private function checkParamExists($param) {
			return $this->isPost ? isset($_POST[$param]) : isset($_GET[$param]);
		}

		private function getTimestamp() {
			$now = new DateTime("now");
			$now->setTimezone(new DateTimezone("America/Chicago"));
			return $now->format("Y-m-d H:i:s");
		}

		public function addResponse($key,$value) {
			$this->response[$key] = $value;
		}

		public function response() {
			echo $this->isPost;
			$this->response=["fskdfds","sfdlkfds",$_GET["debug"]];
			print_r($this->response);
			print_r($_GET);
			echo json_encode($this->response);
		}
	}

	$apiLogger = new api_logger();

?>

