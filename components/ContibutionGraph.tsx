import Image from "next/image";
import React from "react";

interface ContibutionGraphProps{
    username:string;
}

const ContibutionGraph : React.FC<ContibutionGraphProps> = ({username}) => {
    const graphUrl = `https://ghchart.rshah.org/${username}`;
    return (
        <div className="box border p-4 rounded-lg shadow-md bg-dark-500 flex flex-col mt-4 text-[#F8FAFC]">
            <h3 className="text-2xl font-semibold mb-4 text-left underline">
                Contibution Graph 
            </h3>
            <img 
            src={graphUrl}
            alt="Contibution Graph"
            style={{width:"100%" , alignItems:"center" , wordSpacing:"1rem"}}
             />
        </div>
    )
}

export default ContibutionGraph;