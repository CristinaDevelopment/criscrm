import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'sitesDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_SITE'),
        useNewUrlParser: true,
        useUnifiedTopology: true,

      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'pagesDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_PAGE'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'productsDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_PRODUCTS'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'articlesDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_ARTICLES'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'usersDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_USERS'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'wearsDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_WEARS'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'toolsDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_TOOLS'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'glassesDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_GLASSES'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'enginiesDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_ENGINIES'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
// @Module({
//   imports: [
//     MongooseModule.forRootAsync({
//       useFactory: async (configService: ConfigService) => ({
//         uri: configService.get<string>('MONGODB_URL'),
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class MongoModule {}