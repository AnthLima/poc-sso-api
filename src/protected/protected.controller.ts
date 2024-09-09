import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-strategy/jwt-auth-guard';

@Controller('protected')
export class ProtectedController {
  @Get('route')
  @UseGuards(JwtAuthGuard)
  getProtectedData(@Req() req: any) {
    const user = req.user;

    return {
      message: 'This endpoint is protected',
      user,
    };
  }
}
