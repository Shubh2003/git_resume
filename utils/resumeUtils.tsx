import axios from "axios";

const configData = {
    maxItems:5,
    maxLanguage:5
}
interface Repo{
    name:string;
    id:number;
    date:string;
    langauge?:string;
    description?:string;
    homepage?:string;
    username:string;
    watchers:number;
    forks:number;
    popularity:number;
    watchersLabel:string;
    forksLabel:string;
    html_url:string;
} 
interface Language{
    name:string;
    popularity:number;
    percent:number;
    url:string;
}
interface RepoContribution{
    repository:any;
    commitCount:any;
    name:string;
    contribution:number;
    url:string;
}
export interface Contribution{
    organizationName:string;
    repoUrl:string;
    repository:string;
    url:string;
    commitCount:number;
}
export interface Organization{
    name:string;
    url:string;
    joinedYear:number;
}

const sortByPopularity = (a:Repo ,b:Repo) => {
    return b.popularity - a.popularity;
}

const sortLanguages = (
    languages:{[key:string]:number},
    username:string
):Language[] => {
    let totalUsage = Object.values(languages).reduce((acc,value) => acc+value,0 );

    return Object.entries(languages)
        .map(([name,popularity]) => ({
            name,
            popularity,
            percent:(popularity / totalUsage) * 100,
            url: `https://github.com/search?q=user%3A${username}&l=${encodeURIComponent(
        name
      )}`,
        }))
        .sort((a,b) => b.popularity - a.popularity)
        .slice(0,configData.maxLanguage)
    }

    //TODO
    // fetchOrganization,fecthContribution,fetchPopularrepos,languagedata,userstats