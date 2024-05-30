<?php
class SubjectController
{
    protected $subjectRepository;

    public function __construct()
    {
        $this->subjectRepository = new SubjectRepository();
    }

    function index()
    {
        $page = $_GET['page'] ?? 1;
        $item_per_page = 5;
        $pattern = $_GET['search'] ?? '';
        $allSubjects = $this->subjectRepository->getByPattern($pattern);
        $totalItem = count($allSubjects);
        $totalPage = ceil($totalItem / $item_per_page);
        
        $list = $_GET['list'] ?? null;
        if ($list == 'all') {
            $subjects = $this->subjectRepository->getByPattern($pattern);
            $totalPage = 1;
        }
        else {
            $subjects = $this->subjectRepository->getByPattern($pattern, $page, $item_per_page);

        }

       
        $response = [
            'items'=>  $subjects,
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
        $subject = $this->subjectRepository->find($id);
        $response = json_encode($subject);
        echo $response;
    }

    function store()
    {
        $info = json_decode(file_get_contents("php://input"));

        $data = [];
        $data['name'] = $info->name;
        $data['number_of_credit'] = $info->number_of_credit;

        $result = $this->subjectRepository->save($data);

        if ($result !== false) {
            $subject = $this->subjectRepository->find($result);
            $response = json_encode($subject);
        } else {
            $response = json_encode($this->subjectRepository->error);
        }

        echo $response;
    }

    function update($params)
    {
        $info = json_decode(file_get_contents("php://input"));

        $id = $params['id'];

        $subject = $this->subjectRepository->find($id);

        $name = $info->name ?? $subject->name;
        $number_of_credit = $info->number_of_credit ?? $subject->number_of_credit;

        //cập nhật lại thông tin cho sinh từ ô nhập liệu
        $subject->name = $name;
        $subject->number_of_credit = $number_of_credit;

        $result = $this->subjectRepository->update($subject);

        if ($result != false) {
            $response = json_encode($subject);
        } else {
            $response = json_encode($this->subjectRepository->error);
        }
        echo $response;
    }

    function destroy($params)
    {
        $id = $params['id'];
        $result = $this->subjectRepository->destroy($id);

        if ($result) {
            $response = json_encode('Đã xóa môn học thành công');
        } else {
            $response = json_encode($this->subjectRepository->error);
        }
        echo $response;
    }
}