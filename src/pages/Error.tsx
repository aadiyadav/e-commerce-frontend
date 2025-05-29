import bgimage from "../assets/error-background.png";

const Error = () => {
  return (
    <div
      className="w-full h-[calc(70vh-2px)] relative md:text-3xl font-dmsans text-xl bg-slate-100"
      style={{ backgroundImage: `url(${bgimage})`, backgroundSize: '60vh', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
    >
      <div className="flex flex-col justify-center items-center h-full gap-66">
        <div>
          Ummm... Hello sir? Looks like you have lost the track...
        </div>
        <div className="">
            This is not allowed, kindly go back.
        </div>
      </div>
    </div>
  );
};

export default Error;
