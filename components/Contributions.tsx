import React,{useState,useEffect} from "react";
import { Contribution as ContributionType } from "@/utils/resumeUtils";
import { fetchContributions} from "@/utils/resumeUtils";

interface ContributionsProps{
    username:string;
    contributionCount:number;
}
const Contributions:React.FC<ContributionsProps> = ({
    username,contributionCount
}) => {
    const[contributions,setContributions] = useState<ContributionType[]>([]);
    useEffect(() => {
       const fetchAndSetOrganization = async () => {
        try {
            const contributionData = await fetchContributions(username);
            setContributions(
                contributionData.slice(0,contributionCount).map((contribution)=>({
                    organizationName:contribution.organizationName,
                    repoUrl:contribution.repoUrl,
                    repository:contribution.repository,
                    url:contribution.url,
                    commitCount:contribution.commitCount
                }))
            );
            
        } catch (error) {
            console.error("Error fetching Contribution",error)
        }
       }
       fetchAndSetOrganization();
    },[username,contributionCount])
    return (
        <div className="mt-5 text-[#F8FAFC]">
          <h2 className="text-2xl font-bold underline mb-4 text-left ">
            Contributions
          </h2>
          <ul className="list-disc px-6">
            {contributions.map((contribution, index) => (
              <li key={index} className="mt-4">
                <a
                  href={contribution.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-500 hover:underline cursor-pointer underline"
                >
                  {contribution.organizationName}/{contribution.repository}{" "}
                </a>
                <p className="text-gray-400 text-sm">
                  has contributed to <strong>{contribution.repository}</strong>{" "}
                  with&nbsp;
                  <a
                    href={contribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-500 hover:underline"
                  >
                    {contribution.commitCount} commit(s)
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default Contributions