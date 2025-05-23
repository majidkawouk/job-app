"use client"

export default function Main(){
    return(
        <div className="  bg-gradient-to-br from-[#FF6A00] to-[#FFB347] w-full min-h-screen flex flex-col items-center justify-start py-10 px-6 text-slate-800">
            <img src="motorway.png"  className="absolute opacity-10" alt="" />
           <ul className="text-3xl list-disc font-bold "> 
             <li className="my-9">🏞 Welcome to Job Trail</li>
            <li className="my-9">  Your personal job application tracker.</li>
            <li className="my-9">Stay organized, never miss an opportunity</li>
            <li className="my-9">track every step of your job hunt  from application to offer.</li>
            
        </ul> 

        <div className="flex flex-col items-center gap-4 mt-10 text-white">
  <button className="bg-black z-20 hover:bg-gray-900 transition rounded-md px-6 py-3 text-xl font-semibold shadow">
    + Start Tracking Jobs
  </button>
  <span className="text-3xl font-normal text-gray-100">OR</span>
  <button className="bg-black hover:bg-gray-900 transition rounded-md px-6 py-3 text-xl font-semibold shadow">
    View Your Dashboard
  </button>
</div>

        </div>
    )
}