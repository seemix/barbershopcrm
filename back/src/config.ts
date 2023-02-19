interface IConfig {
    MONGO_URL: string;
    FRONTEND_URL: string | undefined;
    PORT: number;
}

const config: IConfig = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://levelup:Levelup100@cluster0.bsyoiat.mongodb.net/?retryWrites=true&w=majority',
    FRONTEND_URL: process.env.FRONTEND_URL || '',
    PORT: Number(process.env.PORT) || 6000
};
export default config;