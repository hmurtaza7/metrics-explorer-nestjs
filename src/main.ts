import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';

import { AppModule } from './app.module';
import './opentelemetry-setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure the gRPC microservice
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'metrics',
      protoPath: 'src/metrics.proto',
      url: 'localhost:50051',
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
