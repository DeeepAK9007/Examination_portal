export interface termType {
  term_name: string;
  start_date: string;
  end_date: string;
}

export interface courseType {
  course_name: string;
  course_code: string;
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
}
