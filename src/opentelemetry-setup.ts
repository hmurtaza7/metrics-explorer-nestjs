import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4317', // Jaeger gRPC endpoint for OTLP
});

const sdk = new NodeSDK({
  traceExporter,
  serviceName: 'metrics-explorer-nestjs',
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
