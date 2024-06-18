export interface termType {
  term_name: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface courseType {
  course_name: string;
  course_code: string;
  status: string;
}

export interface scheduleType {
  date: string;
  examination_name: string;
  course_name: string;
  room_number: string;
  invigilator: string;
  instructor: string;
  supervisor: string;
  remarks: string;
  status: string;
}

export interface examModeUpdateType {
  date: string;
  examination_name: string;
  course_name: string;
  room_number: string;
  invigilator: string;
  instructor: string;
  supervisor: string;
  mode: string;
  remarks: string;
  status: string;
}

export interface batchType {
  batch_name: string;
}

export interface RoomType {
  room_number: string;
  block: string;
  capacity: number | undefined;
}

export interface userType {
  name: string;
  role: string;
  email: string;
  roll_number: string;
  mobile_number: string;
  card_number: string;
  expiry_date: string;
  image_url: string;
}

export interface RoomType {
  room_number: string;
  block: string;
  capacity: number | undefined;
  status: string;
}

export interface userType {
  name: string;
  role: string;
  email: string;
  roll_number: string;
  mobile_number: string;
  card_number: string;
  expiry_date: string;
  image_url: string;
  status: string;
}

export interface getuserType {
  card_number: string
  email:string
  expiry_date:string
  g_created_by_id:string
  g_created_by_name:string
  g_creation_time:number,
  g_soft_delete:string
  id:string
  image_url:string
  mobile_number:string
  name:string
  role:string
  roll_number:string
  status:string
}

export interface userMappedType{
  id:string
  roll_number:string
  Uname:string
  email:string
  role:string
  status:string
}

export interface getBatchType{
    id:string,
    g_created_by_id: string,
    g_created_by_name: string,
    g_creation_time: number,
    g_soft_delete: string,
    batch_name: string
    status: string
}

export interface batchMappedType{
    id:string,
    batch_name:string
    status:String
}

export interface getRoomType{
  id: string,
  g_created_by_id: string
  g_created_by_name: string,
  g_creation_time: number,
  g_soft_delete: string,
  room_number: string,
  block: string,
  capacity: number,
  status: string
}
export interface roomMatchedType
{
  room_number: string,
  block: string,
  capacity: number,
  status: string
}

export interface ExamModeType {
  exam_mode_name: string,
  remark: string,
  status:string
}
export interface getModeTypes{
  id: string,
  g_created_by_id: string,
  g_created_by_name: string,
  g_creation_time: number,
  g_soft_delete: string,
  exam_mode_name: string,
  remark: string,
  status:string
}

export interface ExamTypeType {
  exam_type_name: string,
  remark: string,
  status:string
}
export interface getTypeTypes{
  id: string,
  g_created_by_id: string,
  g_created_by_name: string,
  g_creation_time: number,
  g_soft_delete: string,
  exam_type_name: string,
  remark: string,
  status:string
}