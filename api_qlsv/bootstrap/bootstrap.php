<?php
if (!isset($_SESSION)) {
    session_start();
}
// Require database connection
require_once 'config/config.php';
require 'connectDb.php';

//Require models
require 'model/Student.php';
require 'model/StudentRepository.php';

require 'model/Subject.php';
require 'model/SubjectRepository.php';

require 'model/Register.php';
require 'model/RegisterRepository.php';

require 'model/User.php';
require 'model/UserRepository.php';

// Require Controllers
require_once 'controller/StudentController.php';
require_once 'controller/SubjectController.php';
require_once 'controller/RegisterController.php';
require_once 'controller/AuthController.php';
require_once 'controller/UserController.php';
// Require routes
require_once 'routes/api.php';
require_once 'routes/Router.php';

new Router($router);