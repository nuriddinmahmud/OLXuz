import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        fullname: dto.fullname,
        email: dto.email,
        password: hash,
        phone: dto.phone,
        location: dto.location,
        image: dto.image,
        role: dto.role,
        regionId: BigInt(dto.regionId),
        year: new Date(dto.year),
      },
    });

    await this.sendOtp(dto.email);

    return {
      message: 'Foydalanuvchi yaratildi. Emailga tasdiqlash kodi yuborildi.',
    };
  }

  async sendOtp(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000); 

    await this.prisma.user.update({
      where: { email },
      data: {
        otpCode: code,
        otpExpires: expires,
      },
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"OLX App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Tasdiqlash kodi',
      text: `Sizning tasdiqlash kodingiz: ${code}`,
    });

    return { message: 'Tasdiqlash kodi yuborildi' };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.otpCode || !user.otpExpires) {
      throw new NotFoundException('Foydalanuvchi yoki kod topilmadi');
    }

    if (user.otpCode !== dto.code) {
      throw new BadRequestException('Noto‘g‘ri kod');
    }

    if (user.otpExpires < new Date()) {
      throw new BadRequestException('Kod muddati tugagan');
    }

    await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        isVerified: true,
        otpCode: null,
        otpExpires: null,
      },
    });

    return { message: 'Email tasdiqlandi' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
 
    if (!user) throw new UnauthorizedException('User not found');
    if (!user.isVerified) {
      throw new UnauthorizedException('Email hali tasdiqlanmagan');
    }

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Notogri parol');

    return {
      message: 'Login muvaffaqiyatli',
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }
}
