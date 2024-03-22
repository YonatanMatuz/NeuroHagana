class AppConfig {

    public serverUrl = "http://localhost:4000/";

    public imagesUrl = this.serverUrl + "api/images/";
}

const appConfig = new AppConfig();

export default appConfig;
