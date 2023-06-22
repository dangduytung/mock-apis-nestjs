import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AuthMiddleware } from './auth.middleware';
import { AuthIgnoreMiddleware } from './auth_ignore.middleware';
import { CommonModule } from './common/common.module';
import { TagsModule } from './tags/tags.module';
import { TypesModule } from './types/types.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CommonModule,
    TagsModule,
    TypesModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})

// // Does not authenticate token
// export class AppModule {}

// // Authenticate token
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .exclude(
//         { path: '/api/settings', method: RequestMethod.GET },
//         { path: '/api/login', method: RequestMethod.POST },
//         { path: '/api/token', method: RequestMethod.POST },
//       )
//       .forRoutes('*');
//   }
// }

// Show log all requests
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthIgnoreMiddleware).forRoutes('*');
  }
}
