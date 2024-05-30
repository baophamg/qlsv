<?php
class SubjectRepository
{
    public $error;
    protected function fetch($cond = null, $page = null, $item_per_page = null)
    {
        //Mặc định bên trong hàm ko thể truy xuất biến bên ngoài hàm
        global $conn; //Để bên trong hàm có thể truy xuất biến bên ngoài hàm
        $sql = "SELECT * FROM subject";
        if ($cond) {
            $sql .= " WHERE $cond";
        }
        if ($item_per_page && $page) {
            $pageIndex = ($page - 1) * $item_per_page;
            $sql .= " LIMIT $pageIndex, $item_per_page";
        }
        $result = $conn->query($sql);
        $subjects = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                //Dấu [] là thêm 1 phần tử vào cuối danh sách array
                $subjects[] = new Subject($row['id'], $row['name'], $row['number_of_credit']);
            }
        }
        return $subjects;
    }

    function getAll()
    {
        $subjects = $this->fetch();
        return $subjects;
    }

    function find($id)
    {
        $cond = "id=$id";
        $subjects = $this->fetch($cond); //danh sách chỉ 1 phần tử 
        $subject = current($subjects); //lấy phần tử đầu tiên của danh sách
        return $subject;
    }

    function save($data)
    {
        global $conn;
        $name = $data['name'];
        $number_of_credit = $data['number_of_credit'];

        $sql = "INSERT INTO subject (name, number_of_credit) VALUES('$name', '$number_of_credit')";
        if ($conn->query($sql)) {
            $last_id = $conn->insert_id; //chỉ cho auto increment
            return $last_id;
        }
        $this->error = "Error" . $sql . "<br>" . $conn->error;
        return false;
    }

    function update($subject)
    {
        global $conn;
        $name = $subject->name;
        $number_of_credit = $subject->number_of_credit;
        $id = $subject->id;
        $sql = "UPDATE subject SET name='$name', number_of_credit='$number_of_credit' WHERE id=$id";
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
        $registerRespository = new RegisterRepository();
        $subject_id = $id;
        //Trả về danh sách đăng ký môn học của sinh viên cần xóa
        $registers = $registerRespository->getBySubjectId($subject_id);
        if (count($registers) > 0) {
            $this->error = "Môn học đã đăng ký môn học, vui lòng xóa đăng ký môn học trước";
            return false;
        }

        $sql = "DELETE FROM subject WHERE id=$id";
        if ($conn->query($sql)) {
            return true;
        }
        $this->error = "Error" . $sql . "<br>" . $conn->error;
        return false;
    }
}