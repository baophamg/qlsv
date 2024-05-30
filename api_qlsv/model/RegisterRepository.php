<?php
class RegisterRepository
{
    public $error;
    protected function fetch($cond = null, $page = null, $item_per_page = null)
    {
        //Mặc định bên trong hàm ko thể truy xuất biến bên ngoài hàm
        global $conn; //Để bên trong hàm có thể truy xuất biến bên ngoài hàm
        $sql = "SELECT register.*, student.name AS student_name, subject.name AS subject_name FROM register
        JOIN student ON student.id = register.student_id
        JOIN subject ON subject.id = register.subject_id";
        if ($cond) {
            $sql .= " WHERE $cond";
        }
        if ($item_per_page && $page) {
            $pageIndex = ($page - 1) * $item_per_page;
            $sql .= " LIMIT $pageIndex, $item_per_page";
        }
        $result = $conn->query($sql);
        $registers = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                //Dấu [] là thêm 1 phần tử vào cuối danh sách array
                $registers[] = new Register($row['id'], $row['student_id'], $row['subject_id'], $row['score'], $row['student_name'], $row['subject_name']);
            }
        }
        return $registers;
    }

    function getAll()
    {
        $registers = $this->fetch();
        return $registers;
    }

    function find($id)
    {
        $cond = "register.id=$id";
        $registers = $this->fetch($cond); //danh sách chỉ 1 phần tử 
        $register = current($registers); //lấy phần tử đầu tiên của danh sách
        return $register;
    }

    function save($data)
    {
        global $conn;
        $student_id = $data['student_id'];
        $subject_id = $data['subject_id'];

        $sql = "INSERT INTO register (student_id, subject_id) VALUES('$student_id', '$subject_id')";
        if ($conn->query($sql)) {
            $last_id = $conn->insert_id; //chỉ cho auto increment
            return $last_id;
        }
        $this->error = "Error" . $sql . "<br>" . $conn->error;
        return false;
    }

    function update($register)
    {
        global $conn;
        $score = $register->score;
        $id = $register->id;

        $sql = "UPDATE register SET score='$score' WHERE id=$id";
        if ($score === "") {
            $sql = "UPDATE register SET score=NULL WHERE id=$id";
        }
        if ($conn->query($sql)) {
            return true;
        }
        $this->error = "Error" . $sql . "<br>" . $conn->error;
        return false;
    }

    function getByPattern($search, $page = null, $item_per_page = null)
    {
        $cond = "student.name LIKE '%$search%' OR subject.name LIKE '%$search%'";
        return $this->fetch($cond, $page, $item_per_page);
    }

    function getByStudentId($student_id)
    {
        $cond = "student.id=$student_id";
        $registers = $this->fetch($cond);
        return $registers;
    }

    function getBySubjectId($subject_id)
    {
        $cond = "subject.id=$subject_id";
        $registers = $this->fetch($cond);
        return $registers;
    }

    function destroy($id)
    {
        global $conn;
        $sql = "DELETE FROM register WHERE id=$id";
        if ($conn->query($sql)) {
            return true;
        }
        $this->error = "Error" . $sql . "<br>" . $conn->error;
        return false;
    }
}