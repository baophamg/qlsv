<?php
$router = new AltoRouter();

// Login
$router->map('POST', '/api/v1/login', 'AuthController@login', 'login');

// Student
$router->map('GET', '/api/v1/students', 'StudentController@index', 'student.index');
$router->map('GET', '/api/v1/students/[i:id]', 'StudentController@show', 'student.show');
$router->map('POST', '/api/v1/students', 'StudentController@store', 'student.store');
$router->map('PUT', '/api/v1/students/[i:id]', 'StudentController@update', 'student.update');
$router->map('DELETE', '/api/v1/students/[i:id]', 'StudentController@destroy', 'student.destroy');

// Subject
$router->map('GET', '/api/v1/subjects', 'SubjectController@index', 'subject.index');
$router->map('GET', '/api/v1/subjects/[i:id]', 'SubjectController@show', 'subject.show');
$router->map('POST', '/api/v1/subjects', 'SubjectController@store', 'subject.store');
$router->map('PUT', '/api/v1/subjects/[i:id]', 'SubjectController@update', 'subject.update');
$router->map('DELETE', '/api/v1/subjects/[i:id]', 'SubjectController@destroy', 'subject.destroy');

// Register
$router->map('GET', '/api/v1/registers', 'RegisterController@index', 'register.index');
$router->map('GET', '/api/v1/registers/[i:id]', 'RegisterController@show', 'register.show');
$router->map('POST', '/api/v1/registers', 'RegisterController@store', 'register.store');
$router->map('PUT', '/api/v1/registers/[i:id]', 'RegisterController@update', 'register.update');
$router->map('DELETE', '/api/v1/registers/[i:id]', 'RegisterController@destroy', 'register.destroy');

$router->map('GET', '/api/v1/users/[i:id]', 'UserController@show', 'user.show');