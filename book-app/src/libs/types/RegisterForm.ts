export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string; // สำหรับตรวจสอบก่อนส่ง
}
