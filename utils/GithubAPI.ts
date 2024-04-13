//steps
//1->import axios
// 2->define function
// 3->try catch
// 4->fetch Repositories
// 5->Initialize Language Stats
// 6->Process Repositories
// 7->Accumulate Language Statistics
// 8->Calculate Total Byte Count
// 9->Construct Language Objects
// 10->Handle Error

import axios from "axios";

import { RepoLanguageStats, Language, LanguageDetail } from "@/types";
import Repositories from "@/components/Repositories"

export const fetchContributionLanguage = async (
  username: string
): Promise<Language[]> => {
  try {
    const repoResponse = await axios.get(
      `https://api.github.com/search/repositories?q=user:${username}+fork:true`
    );
    const repos = repoResponse.data.items;

    let LanguageStats: RepoLanguageStats = {};

    for (const repo of repos) {
      const languageReponse = await axios.get(repo.language_url);
      const languages: RepoLanguageStats = languageReponse.data;

      for (const [language, bytes] of Object.entries(languages)) {
        LanguageStats[language] = (LanguageStats[language] || 0) + bytes;
      }
    }

    const totalBytes = Object.values(LanguageStats).reduce(
      (sum, bytes) => sum + bytes,
      0
    );

    return Object.entries(LanguageStats)
      .sort((a, b) => b[1] - a[1])
      .map(
        ([name, bytes]): Language => ({
          name,
          percent: (bytes / totalBytes) * 100,
          url: `https://github.com/search?q=user%3A${username}+language%3A${encodeURIComponent(
            name
          )}`,
        })
      );
  } catch (error) {
    console.error("Error fetching user Contribution language", error);
    return [];
  }
};
