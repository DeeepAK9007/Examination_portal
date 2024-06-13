export interface termType {
  term_name: string;
  start_date: string;
  end_date: string;
}

export interface batchType{
  batch_name: string
}

export interface RoomType
{
    room_number: string,
    block: string,
    capacity : number | undefined
}

export interface userType
{
    name: string,
    role: string,
    email: string,
    roll_number: string,
    mobile_number: string,
    card_number: string,
    expiry_date: string,
    image_url: string,
}