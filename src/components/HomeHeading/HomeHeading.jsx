const HomeHeading = ({heading, subheading}) => {
    return (
        <div className="mons space-y-3 text-center ">
            <h3 className="text-3xl lg:text-4xl mb-2 font-bold text-blue-700">{heading}</h3>
            <p className="lg:w-[600px] mx-auto">{subheading}</p>
        </div>
    );
};

export default HomeHeading;