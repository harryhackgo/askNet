import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  Length,
} from "class-validator";

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+\d{10,15}$/, {
    message: "Phone number must be in international format (e.g., +1234567890)",
  })
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  tg_link: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 50, { message: "Password must be between 6-50 characters long" })
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @IsString()
  description: string;
}
