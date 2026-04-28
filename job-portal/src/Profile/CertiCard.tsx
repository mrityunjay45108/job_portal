const Certification = (props: any) => {
    return (
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md">
                    {/* Issuer ke icon ke liye dynamic path */}
                    <img 
                        className="h-7" 
                        src={props.issuerIcon || `/Icons/Google.png`} 
                        alt={props.issuer} 
                    />
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold">{props.name}</div>
                    <div className="text-sm text-mine-shaft-300 ">
                        {props.issuer} &bull; {props.location || "United States"}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end gap-0">
                <div className="text-sm text-mine-shaft-300">{props.date}</div>
                <div className="text-sm text-mine-shaft-300">ID: {props.id}</div>
            </div>
        </div>
    );
};

export default Certification;
