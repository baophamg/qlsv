<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Router
{
    protected $match;
    protected $controller;
    protected $method;

    public function __construct(AltoRouter $router)
    {
        $this->match = $router->match();
        $match = $router->match();

        // var_dump($this->match);
        // exit;

        if ($this->match) {
            // check access token
            //turn on token
            if (true && !in_array($this->match['name'], ['login'])) {
                try {
                    $headers = apache_request_headers(); // hoặc getallheaders()
                    if (isset($headers['Authorization'])) {
                        $authorizationHeader = $headers['Authorization'];
                    }

                    if (!isset($authorizationHeader) || !preg_match('/Bearer\s(\S+)/', $authorizationHeader, $matches)) {
                        header('HTTP/1.0 400 Bad Request');
                        echo 'Access Token not found in request';
                        exit;
                    }
                    $access_token = $matches[1];

                    $key = JWT_KEY;
                    JWT::decode($access_token, new Key($key, 'HS256'));
                } catch (Exception $e) {
                    header('HTTP/1.0 400 Bad Request');
                    echo 'Wrong token';
                    exit;
                }
            }
            //end

            list($controller, $method) = explode('@', $this->match['target']);
            $this->controller = $controller;
            $this->method = $method;

            // var_dump(array(new $this->controller, $this->method));
            // exit;

            if (is_callable(array(new $this->controller, $this->method))) {
                call_user_func_array(
                    array(new $this->controller, $this->method),
                    array($this->match['params']),
                );
            } else {
                echo 'the method' . "$method" . 'was not found on controller' . "$controller";
            }
        } else {
            echo 'the page you are looking could not be found';
        }
    }
}
