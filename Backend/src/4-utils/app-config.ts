class AppConfig {

    public serverUrl = process.env.SERVER_URL;

    public imagesUrl = this.serverUrl + "api/images/";
}

const appConfig = new AppConfig();

export default appConfig;
