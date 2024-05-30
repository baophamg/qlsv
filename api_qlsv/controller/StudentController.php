<?php
class StudentController
{
    protected $studentRepository;

    public function __construct()
    {
        $this->studentRepository = new StudentRepository();
    }

    function index()
    {
        // sleep(10); //ngủ 10 giây
        $page = $_GET['page'] ?? 1;
        $item_per_page = 5;
        $pattern = $_GET['search'] ?? '';
        $allStudents = $this->studentRepository->getByPattern($pattern);
        $totalItem = count($allStudents);
        $totalPage = ceil($totalItem / $item_per_page);

        $list = $_GET['list'] ?? null;
        if ($list == 'all') {
            $students = $this->studentRepository->getByPattern($pattern);
            $totalPage = 1;
        } else {
            $students = $this->studentRepository->getByPattern($pattern, $page, $item_per_page);
        }


        $response = [
            'items' =>  $students,
            'totalItem' => $totalItem,
            'pagination' => [
                'page' => $page,
                'totalPage' => $totalPage
            ]
        ];
        $response = json_encode($response);
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
