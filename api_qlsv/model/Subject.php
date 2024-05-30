<?php 
class Subject {
    // attribute / properties
    public $id;
    public $name;
    public $number_of_credit;

    public function __construct($id, $name, $number_of_credit)
    {
        //Truy cập vào thuộc tính của class Subject
        $this->id = $id;
        $this->name = $name;
        $this->number_of_credit = $number_of_credit;
    }
}
