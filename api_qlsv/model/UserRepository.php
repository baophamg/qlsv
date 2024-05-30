<?php
class UserRepository
{
    public $error;
    protected function fetch($cond = null, $page = null, $item_per_page = null)
    {
        //Mặc định bên trong hàm ko thể truy xuất biến bên ngoài hàm
        global $conn; //Để bên trong hàm có thể truy xuất biến bên ngoài hàm
        $sql = "SELECT * FROM user";
        if ($cond) {
            $sql .= " WHERE $cond";
        }
        if ($item_per_page && $page) {
            $pageIndex = ($page - 1) * $item_per_page;
            $sql .= " LIMIT $pageIndex, $item_per_page";
        }
        $result = $conn->query($sql);
        $users = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                //Dấu [] là thêm 1 phần tử vào cuối danh sách array
                $users[] = new User($row['id'], $row['name'], $row['email'], $row['password']);
            }
        }
        return $users;
    }

    function getAll()
    {
        $users = $this->fetch();
        return $users;
    }

    function find($id)
    {
        $cond = "id=$id";
        $users = $this->fetch($cond); //danh sách chỉ 1 phần tử 
        $user = current($users); //lấy phần tử đầu tiên của danh sách
        return $user;
    }

    function findEmail($email)
    {
        $cond = "email='$email'";
        $users = $this->fetch($cond); //danh sách chỉ 1 phần tử 
        $user = current($users); //lấy phần tử đầu tiên của danh sách
        return $user;
    }

    function save($data)
    {
        global $conn;
        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];
        $sql = "INSERT INTO user (name, email, password) VALUES('$name', '$email', '$password')";
        if ($conn->query($sql)) {
            $last_id = $conn->insert_id; //chỉ cho auto increment
            return $last_id;
        }
        $this->error = "Error" . $sql . "<br>" . $conn->error;
        return false;
    }

    function update($user)
    {
        global $conn;
        $name = $user->name;
        $email = $user->email;
        $password = $user->password;
        $id = $user->id;
        $sql = "UPDATE user SET name='$name', email='$email', password='$password' WHERE id=$id";
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
        $user_id = $id;
        $registerRespository = new RegisterRepository();

        //Trả về danh sách đăng ký môn học của sinh viên cần xóa
        $registers = $registerRespository->getByUserId($user_id);
        if (count($registers) > 0) {
            $this->error = "Sinh viên đã đăng ký môn học, vui lòng xóa đăng ký môn học trước";
            return false;
        }

        $sql = "DELETE FROM user WHERE id=$id";
        if ($conn->query($sql)) {
            return true;
        }
        $this->error = "Error" . $sql . "<br>" . $conn->error;
        return false;
    }
}