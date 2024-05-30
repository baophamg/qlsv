<?php
class RegisterController
{
    protected $registerRepository;

    public function __construct()
    {
        $this->registerRepository = new RegisterRepository();
    }

    function index()
    {
        $page = $_GET['page'] ?? 1;
        $item_per_page = 5;
        $pattern = $_GET['search'] ?? '';
        $allRegisters = $this->registerRepository->getByPattern($pattern);
        $totalItem = count($allRegisters);
        $totalPage = ceil($totalItem / $item_per_page);
        
        $registers = $this->registerRepository->getByPattern($pattern, $page, $item_per_page);

       
        $response = [
            'items'=>  $registers,
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
        $register = $this->registerRepository->find($id);
        $response = json_encode($register);
        echo $response;
    }

    function store()
    {
        $info = json_decode(file_get_contents("php://input"));

        $data = [];
        $data['student_id'] = $info->student_id;
        $data['subject_id'] = $info->subject_id;

        $result = $this->registerRepository->save($data);

        if ($result !== false) {
            $register = $this->registerRepository->find($result);
            $response = json_encode($register);
        } else {
            $response = json_encode($this->registerRepository->error);
        }

        echo $response;
    }

    function update($params)
    {
        $info = json_decode(file_get_contents("php://input"));

        $id = $params['id'];
        $score = $info->score;
        $register = $this->registerRepository->find($id);

        //cập nhật lại thông tin cho sinh từ ô nhập liệu
        $register->score = $score;

        $result = $this->registerRepository->update($register);

        if ($result != false) {
            $response = json_encode($register);
        } else {
            $response = json_encode($this->registerRepository->error);
        }
        echo $response;
    }

    function destroy($params)
    {
        $id = $params['id'];
        $result = $this->registerRepository->destroy($id);

        if ($result) {
            $response = json_encode('Đã xóa đăng ký thành công');
        } else {
            $response = json_encode($this->registerRepository->error);
        }
        echo $response;
    }
}