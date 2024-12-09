const SectionTitle = ({heading, subheading}) => {
    return (
        <div className="mons space-y-3 text-center ">
            <hr className="border-blue-500 mx-[500px]"/>
            <h3 className="text-3xl font-bold text-blue-700">{heading}</h3>
            <p className="lg:w-[400px] mx-auto">{subheading}</p>
            <hr className="border-blue-500 mx-[500px]"/>
        </div>
    );
};

export default SectionTitle;