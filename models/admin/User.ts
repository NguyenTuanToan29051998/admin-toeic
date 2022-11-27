export interface UserDTO {
  id: string;
  username: string;
  role: string;
  email: string;
}

export interface UserListDTO {
  totalRecords: number;
  totalPage: number;
  pageNo: number;
  pageSize: UserDTO[];
}
