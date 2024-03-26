class AppConfig {

    public serverUrl = "https://api.neurohagana.com/";

    public imagesUrl = this.serverUrl + "api/images/";
}

const appConfig = new AppConfig();

export default appConfig;
