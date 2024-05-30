<?php

class UserController
{
    protected $userRepository;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }

    function index()
    {
        $page = $_GET['page'] ?? 1;
        $item_per_page = 5;
        $pattern = $_GET['search'] ?? '';
        $allUsers = $this->userRepository->getByPattern($pattern);
        $totalItem = count($allUsers);
        $totalPage = ceil($totalItem / $item_per_page);
        
        $users = $this->userRepository->getByPattern($pattern, $page, $item_per_page);

       
        $response = [
            'items'=>  $users,
            'totalItem' => $totalItem,
            'pagination'=> [
                'page'=> $page,
                'totalPage'=> $totalPage
            ]
        ];
        $response = json_encode($response);
        echo $response;
    }

    function show($params)
    {
        
        

        $id = $params['id'];
        $user = $this->userRepository->find($id);
        $response = json_encode($user);
        echo $response;
    }

    function store()
    {
        $info = json_decode(file_get_contents("php://input"));
        $data = [];
        $data['name'] = $info->name;
        $data['email'] = $info->email;
        $data['password'] = $info->password;

        $result = $this->userRepository->save($data);

        if ($result !== false) {
            $user = $this->userRepository->find($result);
            $response = json_encode($user);
        } else {
            $response = json_encode($this->userRepository->error);
        }

        echo $response;
    }

    function update($params)
    {
        $info = json_decode(file_get_contents("php://input"));

        $id = $params['id'];

        $user = $this->userRepository->find($id);

        $name = $info->name ?? $user->name;
        $email = $info->email ?? $user->email;
        $password = $info->password ?? $user->password;

        //cập nhật lại thông tin cho sinh từ ô nhập liệu
        $user->name = $name;
        $user->email = $email;
        $user->password = $password;

        $result = $this->userRepository->update($user);

        if ($result != false) {
            $response = json_encode($user);
        } else {
            $response = json_encode($this->userRepository->error);
        }
        echo $response;
    }

    function destroy($params)
    {
        $id = $params['id'];
        $result = $this->userRepository->destroy($id);

        if ($result) {
            $response = json_encode('Đã xóa sinh viên thành công');
        } else {
            $response = json_encode($this->userRepository->error);
        }
        echo $response;
    }
}