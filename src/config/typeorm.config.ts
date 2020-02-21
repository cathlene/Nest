import { TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions ={

    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'learning',
      password: 'learning',
      database: 'taskmanagement',
      entities: [__dirname+'/../**/*.entity*.{js,ts}'], // any file on our source folder that ends with .entity.ts is going to be picked up by tyeporm
      synchronize: true,
};