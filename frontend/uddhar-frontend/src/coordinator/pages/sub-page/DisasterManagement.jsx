const DisasterControl = () => {
return (
<> 
    <div className="w-full h-full bg-gray-700">
        <div className="flex flex-col my-5"> 
            <h1 className="text-white text-3xl font-bold mb-4">Disaster Control</h1>
            <div className="flex gap-[10px]">
                <div className="w-1/2 bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Flood Control</h2>
                    <p>Details about flood control measures...</p>
                </div>
                <div className="w-1/2 bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Earthquake Control</h2>
                    <p>Details about earthquake control measures...</p>
                </div>
            </div>
        </div>
    </div>
</>
);
}
export default DisasterControl;