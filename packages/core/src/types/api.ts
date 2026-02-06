export interface HealthCheckResponse {
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    timestamp: string;
}
