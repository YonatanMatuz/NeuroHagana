class AppConfig {
    
    // Routes are in objects, it is not currently necessary as there arent many routes per object, but it is cleaner to use in services,
    // And will be easier to scale + read as more routes are added
    
    API_URL = process.env.REACT_APP_API_URL;

    // InfoTopic routes
    public infoTopics = {
        baseUrl: this.API_URL + "/api/infotopics/",
        fetchAllInCategoryUrl: this.API_URL+ "/api/infotopics/by-category/",
        getCategoriesUrl: this.API_URL + "/api/infotopics/categories/",
    }

    // TeamMembers main routes
    public teamMembers = {
        baseUrl: this.API_URL + "/api/team-members/",
        getCategoriesUrl: this.API_URL + "/api/team-members/categories",
    }

    // Publications main routes
    public publications = {
        baseUrl: this.API_URL + "/api/publications/",
    }

    // Authentication & Authorization
    public auth = {
        loginUrl: this.API_URL + "/api/auth/login/",
    }

}

const appConfig = new AppConfig();

export default appConfig;
