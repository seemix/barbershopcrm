interface IConfig {
    FRONTEND_URL: string | undefined;
    PORT: number;
}

const config: IConfig = {
    FRONTEND_URL: process.env.FRONTEND_URL || '',
    PORT: Number(process.env.PORT) || 6000
};
export default config;