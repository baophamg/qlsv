<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
class AuthController
{
    // protected $studentRepository;

    public function __construct()
    {
        // $this->studentRepository = new StudentRepository();
    }

    function login()
    {
        $info = json_decode(file_get_contents("php://input"));
        $email = $info->email;
        $password = $info->password;
        $userRepository = new UserRepository();
        $user = $userRepository->findEmail($email);
        // 1. If user không tồn tại thì báo lỗi email không tồn tại trong hệ thống
        if (empty($user)) {

            header('HTTP/1.1 401 Unauthorized');
            echo 'Lỗi: không tồn tại email trong hệ thống';
            exit;

        }

        // 2. Nếu mật khẩu không đúng thì báo lỗi
        
        if (!password_verify($password, $user->password)) {
            header('HTTP/1.1 401 Unauthorized');
            echo 'Lỗi: Sai mật khẩu';
            exit;
        }
    
        $user = [
            "name" => $user->name, 
            "email" => $user->email, 
            "id" => $user->id 
        ];
        
        $payload = $user;
        $key = JWT_KEY;
        $access_token = JWT::encode($payload, $key, 'HS256');

        $data = [
            "user" => $user, 
            "access_token" => $access_token 
        ]; 

        $response = json_encode($data);

        echo $response;
    }

    function show($params)
    {
        $id = $params['id'];
        $student = $this->studentRepository->find($id);
        $response = json_encode($student);
        echo $response;
    }

    function store()
    {
        $info = json_decode(file_get_contents("php://input"));
        $data = [];
        $data['name'] = $info->name;
        $data['birthday'] = $info->birthday;
        $data['gender'] = $info->gender;

        $result = $this->studentRepository->save($data);

        if ($result !== false) {
            $student = $this->studentRepository->find($result);
            $response = json_encode($student);
        } else {
            $response = json_encode($this->studentRepository->error);
        }

        echo $response;
    }

    function update($params)
    {
        $info = json_decode(file_get_contents("php://input"));

        $id = $params['id'];

        $student = $this->studentRepository->find($id);

        $name = $info->name ?? $student->name;
        $birthday = $info->birthday ?? $student->birthday;
        $gender = $info->gender ?? $student->gender;

        //cập nhật lại thông tin cho sinh từ ô nhập liệu
        $student->name = $name;
        $student->birthday = $birthday;
        $student->gender = $gender;

        $result = $this->studentRepository->update($student);

        if ($result != false) {
            $response = json_encode($student);
        } else {
            $response = json_encode($this->studentRepository->error);
        }
        echo $response;
    }

    function destroy($params)
    {
        $id = $params['id'];
        $result = $this->studentRepository->destroy($id);

        if ($result) {
            $response = json_encode('Đã xóa sinh viên thành công');
        } else {
            $response = json_encode($this->studentRepository->error);
        }
        echo $response;
    }
}