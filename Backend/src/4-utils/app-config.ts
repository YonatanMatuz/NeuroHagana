class AppConfig {

    public mySqlHost = "localhost";

    public mySqlUser = "root";

    public mySqlPassword = "";

    public mySqlDatabase = "neuro_hagana";

    public serverUrl = "http://localhost:4000/";

    public imagesUrl = this.serverUrl + "api/images/";
}

const appConfig = new AppConfig();

export default appConfig;
