import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Google SSO Authentication:
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request | any, @Res() res: Response) {
    const jwt = await this.authService.generateJwt(req.user);

    res.cookie('jwt', jwt.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.redirect('http://localhost:5173/login/success');
  }

  //Azure AD authentication:
  @Get('azure-ad')
  @UseGuards(AuthGuard('azure-ad'))
  async azureAdAuth() {}

  @Post('azure-ad/callback')
  @UseGuards(AuthGuard('azure-ad'))
  async azureAdAuthRedirect(@Req() req: Request | any, @Res() res: Response) {
    const jwt = await this.authService.generateJWTByAzureAd(req.user);

    res.cookie('jwt', jwt.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.redirect('http://localhost:5173/login/success'); 
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    res.status(200).json({ success: true, message: 'User logged out successfully' });
  }
}
