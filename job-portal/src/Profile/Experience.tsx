
const Experience = (props: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          {/* Logo container */}
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img 
              className="h-7" 
              src={props.companyIcon || `/Icons/${props.company}.png`} 
              alt={props.company} 
            />
          </div>

          <div className="flex flex-col gap-1">
            {/* Title aur Company dynamic ho gaye */}
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.company} &bull; {props.location}
            </div>
          </div>
        </div>

        {/* Date/Duration section */}
        <div className="text-sm text-mine-shaft-300">
          {props.startDate} - {props.endDate}
        </div>
      </div>

      {/* Description section */}
      <div className="text-sm text-mine-shaft-300 text-justify mt-2">
        {props.description}
      </div>
    </div>
  );
};

export default Experience;