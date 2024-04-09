const AboutProduct = ({ username }) => {
    const profileLink = `https://github.com/${username}`;

    return(
        <div className="bg-gray-100 p-4 mt-8 rounded-lg shadow-inner text-gray-400 text-sm text-center">
            <p>
                Discover more about this developer&apos;s journey on
                <a 
                href={profileLink}
                target="_blank"
                rel="noopener noreferror"
                className="text-blue-600 hover:underline ml-1"
                >
                    Github
                </a>
                .
            </p> 
            <p className="mt-1">
            This résumé is auto-generated, showcasing the synergy between data and
            design.
            </p>
            <p className="mt-1">
                Crafted with ❤️ {" "}
                <a href="https://github.com/Shubh2003"
                target="_blank"
                rel="noopener noreferror"
                className="text-blue-600 hover:underline ml-1"
                >
                    Shubham
                </a>
                ✨
            </p>
        </div>
    );
};

export default AboutProduct;