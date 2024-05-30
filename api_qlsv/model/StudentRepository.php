<?php
class StudentRepository
{
    public $error;
    protected function fetch($cond = null, $page = null, $item_per_page = null)
    {
        //Mặc định bên trong hàm ko thể truy xuất biến bên ngoài hàm
        global $conn; //Để bên trong hàm có thể truy xuất biến bên ngoài hàm
        $sql = "SELECT * FROM student";
        if ($cond) {
            $sql .= " WHERE $cond";
        }
        if ($item_per_page && $page) {
            $pageIndex = ($page - 1) * $item_per_page;
            $sql .= " LIMIT $pageIndex, $item_per_page";
        }
        $result = $conn->query($sql);
        $students = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                //Dấu [] là thêm 1 phần tử vào cuối danh sách array
                $students[] = new Student($row['id'], $row['name'], $row['birthday'], $row['gender']);
            }
        }
        return $students;
    }

    function getAll()
    {
        $students = $this->fetch();
        return $students;
    }

    function find($id)
    {
        $cond = "id=$id";
        $students = $this->fetch($cond); //danh sách chỉ 1 phần tử 
        $student = current($students); //lấy phần tử đầu tiên của danh sách
        return $student;
    }

    function save($data)
    {
        global $conn;
        $name = $data['name'];
        $birthday = $data['birthday'];
        $gender = $data['gender'];
        $sql = "INSERT INTO student (name, birthday, gender) VALUES('$name', '$birthday', '$gender')";
        if ($conn->query($sql)) {
            $last_id = $conn->insert_id; //chỉ cho auto increment
            return $last_id;
        }
        $this->error = "Error" . $sql . "<br>" . $conn->error;
        return false;
    }

    function update($student)
    {
        global $conn;
        $name = $student->name;
        $birthday = $student->birthday;
        $gender = $student->gender;
        $id = $student->id;
        $sql = "UPDATE student SET name='$name', birthday='$birthday', gender='$gender' WHERE id=$id";
        if ($conn->query($sql)) {
            return true;
        }
        $this->error = "Error" . $sql . "<br>" . $conn->error;
        return false;
    }

    function getByPattern($search, $page = null, $item_per_page = null)
    {
        $cond = "name LIKE '%$search%'";
        return $this->fetch($cond, $page, $item_per_page);
    }

    function destroy($id)
    {
        global $conn;
        $student_id = $id;
        $registerRespository = new RegisterRepository();

        //Trả về danh sách đăng ký môn học của sinh viên cần xóa
        $registers = $registerRespository->getByStudentId($student_id);
        if (count($registers) > 0) {
            $this->error = "Sinh viên đã đăng ký môn học, vui lòng xóa đăng ký môn học trước";
            return false;
        }

        $sql = "DELETE FROM student WHERE id=$id";
        if ($conn->query($sql)) {
            return true;
        }
        $this->error = "Error" . $sql . "<br>" . $conn->error;
        return false;
    }
}