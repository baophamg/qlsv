<?php 
class User {
    // attribute / properties
    public $id;
    public $name;
    public $email;
    public $password;

    public function __construct($id, $name, $email, $password)
    {
        //Truy cập vào thuộc tính của class Student
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
    }
}