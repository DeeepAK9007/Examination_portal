export interface termType {
  id?: string;
  term_name: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface courseType {
  id?: string;
  course_name: string;
  instructor_id: string;
  course_code: string;
  status: string;
}

export interface scheduleType {
  id?: string;
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
  id?: string;
  batch_name: string;
  status: string;
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
  id?: string;
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
  card_number: string;
  email: string;
  expiry_date: string;
  g_created_by_id: string;
  g_created_by_name: string;
  g_creation_time: number;
  g_soft_delete: string;
  id: string;
  image_url: string;
  mobile_number: string;
  name: string;
  role: string;
  roll_number: string;
  status: string;
}

export interface userMappedType {
  id: string;
  roll_number: string;
  Uname: string;
  email: string;
  role: string;
  status: boolean;
}

export interface getBatchType {
  id: string;
  g_created_by_id: string;
  g_created_by_name: string;
  g_creation_time: number;
  g_soft_delete: string;
  batch_name: string;
  status: string;
}

export interface batchMappedType {
  id: string;
  batch_name: string;
  status: boolean;
}

export interface getRoomType {
  id: string;
  g_created_by_id: string;
  g_created_by_name: string;
  g_creation_time: number;
  g_soft_delete: string;
  room_number: string;
  block: string;
  capacity: number;
  status: string;
}
export interface roomMatchedType {
  id: string;
  room_number: string;
  block: string;
  capacity: number;
  status: boolean;
}

export interface ExamModeType {
  id?: string;
  exam_mode_name: string;
  remark: string;
  status: string;
}
export interface getModeTypes {
  id: string;
  g_created_by_id: string;
  g_created_by_name: string;
  g_creation_time: number;
  g_soft_delete: string;
  exam_mode_name: string;
  remark: string;
  status: string;
}

export interface getExamModeTypes {
  id?: string;
  exam_mode_name: string;
  remark: string;
  status: boolean;
}

export interface ExamTypeType {
  id?: string;
  exam_type_name: string;
  remark: string;
  status: string;
}
export interface getTypeTypes {
  id: string;
  g_created_by_id: string;
  g_created_by_name: string;
  g_creation_time: number;
  g_soft_delete: string;
  exam_type_name: string;
  remark: string;
  status: string;
}

export interface getExamType {
  id?: string;
  exam_type_name: string;
  remark: string;
  status: boolean;
}

export interface deletestuff {
  id?: string;
}

export interface studsBycourse {
  id?: string;
  student_id: string;
  stud_name: string;
  grade: string;
  remark: string;
}

export interface enrollmentType {
  user_type_enrollment_id: string;
  course_enrollment_id: string;
}

export interface selectedRollNoType {
  SELECT_ALL: string;
}

export interface addProgCordType {
  id?: string;
  date: string;
  examination_name: string;
  course_name: string;
  room_number: string;
  remarks: string;
  status: string;
}

export interface attendanceType {
  id?: string;
  name?: string;
  marktime?: string;
  photo?: string;
}

export interface attendance {
  id?: string;
  exam_schedule_id?: string;
  user_id?: string;
  attendance: string;
  incident_report?: string;
  remarks?: string;
}

export interface incidentType {
  id?: string;
  name?: string;
  marktime?: string;
  photo?: string;
}

export interface incident {
  id?: string;
  exam_schedule_id?: string;
  user_id?: string;
  attendance: attendanceType;
  incident_report: string;
  remarks: string;
}

export interface issueType {
  id?: string;
  name?: string;
  marktime?: string;
  photo?: string;
}

export interface issue {
  id?: string;
  exam_schedule_id?: string;
  user_id?: string;
  attendance: attendanceType;
  incident_report: string;
  remarks: string;
}

export interface AddAttendProps {
  courseCode: string;
  courseName: string;
}
