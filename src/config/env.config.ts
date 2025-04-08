import { registerAs } from '@nestjs/config';

export interface EnvConfig {
    port: number;
}

export const envConfig = registerAs('env', () => ({
    port: parseInt(process.env.PORT || '3000', 10),
}));
