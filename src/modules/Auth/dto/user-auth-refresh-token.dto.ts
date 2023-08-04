import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthRefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
