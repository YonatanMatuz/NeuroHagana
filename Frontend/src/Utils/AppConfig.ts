class AppConfig {
    
    // Routes are in objects, it is not currently necessary as there arent many routes per object, but it is cleaner to use in services,
    // And will be easier to scale + read as more routes are added
    
    url = "https://api.neurohagana.com";

    // InfoTopic routes
    public infoTopics = {
        baseUrl: this.url + "/api/infotopics/",
        fetchAllInCategoryUrl: this.url+ "/api/infotopics/by-category/",
        getCategoriesUrl: this.url + "/api/infotopics/categories/",
    }

    // TeamMembers main routes
    public teamMembers = {
        baseUrl: this.url + "/api/team-members/",
        getCategoriesUrl: this.url + "/api/team-members/categories",
    }

    // Publications main routes
    public publications = {
        baseUrl: this.url + "/api/publications/",
    }

    // Authentication & Authorization
    public auth = {
        loginUrl: this.url + "/api/auth/login/",
    }

}

const appConfig = new AppConfig();

export default appConfig;
