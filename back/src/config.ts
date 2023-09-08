interface IConfig {
    FRONTEND_URL: string | undefined;
    PORT: number;
    CUSTOMERS_PER_PAGE: number;
}

const config: IConfig = {
    FRONTEND_URL: process.env.FRONTEND_URL || '',
    PORT: Number(process.env.PORT) || 6000,
    CUSTOMERS_PER_PAGE: Number(process.env.CUSTOMERS_PER_PAGE) | 3
};
export default config;