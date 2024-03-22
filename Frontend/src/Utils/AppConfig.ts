class AppConfig {
    
    // Routes are in objects, it is not currently necessary as there arent many routes per object, but it is cleaner to use in services,
    // And will be easier to scale + read as more routes are added
    
    REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    // InfoTopic routes
    public infoTopics = {
        baseUrl: this.REACT_APP_API_URL + "/api/infotopics/",
        fetchAllInCategoryUrl: this.REACT_APP_API_URL + "/api/infotopics/by-categories/",
        getCategoriesUrl: this.REACT_APP_API_URL + "/api/infotopics/categories/",
    }

    // TeamMembers main routes
    public teamMembers = {
        baseUrl: this.REACT_APP_API_URL + "/api/team-members/",
        getCategoriesUrl: this.REACT_APP_API_URL + "/api/team-members/categories",
    }

    // Publications main routes
    public publications = {
        baseUrl: this.REACT_APP_API_URL + "/api/publications/",
    }

    // Authentication & Authorization
    public auth = {
        loginUrl: this.REACT_APP_API_URL + "/api/auth/login/",
    }

}

const appConfig = new AppConfig();

export default appConfig;

// terraform