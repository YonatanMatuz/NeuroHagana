class AppConfig {

    public serverUrl = "https://neuro-api.azurewebsites.net";

    public imagesUrl = this.serverUrl + "/api/images/";
}

const appConfig = new AppConfig();

export default appConfig;
