import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contacts/entities/contact.entity';
import { ContactsModule } from './contacts/contacts.module';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Ensures .env variables are loaded globally
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST ?? 'localhost', // Ensure fallback value
      port: Number(process.env.POSTGRES_PORT) || 5432, // Convert to number
      username: process.env.POSTGRES_USER ?? 'admin',
      password: process.env.POSTGRES_PASSWORD ?? 'admin123',
      database: process.env.POSTGRES_DB ?? 'contact_management',
      entities: [Contact], // Auto-load entity
      autoLoadEntities: true,
      synchronize: true, // Use only in development
    }),
    ContactsModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
