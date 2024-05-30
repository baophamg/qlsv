<?php 
class Student {
    // attribute / properties
    public $id;
    public $name;
    public $birthday;
    public $gender;

    public function __construct($id, $name, $birthday, $gender)
    {
        //Truy cập vào thuộc tính của class Student
        $this->id = $id;
        $this->name = $name;
        $this->birthday = $birthday;
        $this->gender = $gender;
    }
}
