"use client";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import {
  fetchPopularRepos,
  fetchLanguageData,
  fetchUserStats,
} from "@/utils/resumeUtils";
import StatsBox from "@/components/StatsBox";
import LanguageBarChart from "@/components/LanguageChart";
import ContibutionGraph from "@/components/ContibutionGraph";
import Contributions from "@/components/Contributions";
import Organizations from "@/components/Organizations";
import Repositories from "@/components/Repositories";
import AboutProduct from "@/components/AboutProduct";
import { useParams } from "next/navigation";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface GitHubProfile {
  name: string;
  bio: string;
  blog: string;
  login: string;
  avatar_url: string;
  repos_url: string;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  homepage?: string;
  watchers: number;
  forks: number;
  popularity: number;
  watchersLabel: string;
  forksLabel: string;
  isOwner: boolean;
  date: number;
}

interface Language {
  name: string;
  popularity: number;
  url: string;
  percent: number;
}

const ViewResume = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languageData, setLanguageData] = useState<Language[]>([]);
  const [userStats, setUserStats] = useState({});

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await fetch(
        `https://api.github.com/users/${username}`
      ).then((res) => res.json());
      setProfile(profileData);

      const reposData = await fetchPopularRepos(username as string);
      setRepos(reposData as unknown as GitHubRepo[]);

      const languages = await fetchLanguageData(username as string);
      setLanguageData(languages);

      const stats = await fetchUserStats(username as string);
      setUserStats(stats);
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center w-full flex-grow ">
      <div
        ref={printRef}
        className="bg-card p-6 rounded-md shadow-md max-w-4xl border-2 border-gray-400 mt-2"
      >
        <div className="flex flex-col items-center">
          <Image
            src={profile.avatar_url || ""}
            alt="Profile"
            className="rounded-full mb-4"
            width={124}
            height={124}
          />
          <h1 className="text-3xl font-bold text-center">
            {profile.name || profile.login}
          </h1>
          <p className="text-center">{profile.bio}</p>
          <a
            href={profile.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {profile.blog}
          </a>
        </div>
        <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
        <div className="flex w-full mt-6 gap-2">
          <div className="flex-1 w-1/2 h-full">
            <LanguageBarChart languages={languageData} />
          </div>
          <div className="flex-1 h-full">
            <StatsBox username={username as string} />
          </div>
        </div>
        <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
        <Repositories repos={repos} repoCount={5} />
        <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
        <ContibutionGraph username={username as string} />
        <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
        <Contributions username={username as string} contributionCount={5} />
        <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
        <Organizations username={username as string} count={5} />
        <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
        <AboutProduct username={username as string} />
      </div>
    </div>
  );
};

export default ViewResume;