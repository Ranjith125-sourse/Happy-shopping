import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const Welcome = () => {
    const text = "Welcome to online shopping patform";
    const arr = text?.split("");

    useGSAP(()=>{
        gsap.from(".welcome", {
            x: 100,
            opacity: 0,
            duration: 0.8,
            delay: 1.8,
            stagger: 0.1
        })
    })

  return (
    <div className="flex flex-col pl-[15vw] items-center pt-[12vw] bg-lime-200 h-[38vw]">
     <h1 className='text-[60px] font-thin flex'>{
        arr?.map((a) => <p className="welcome">{a === " " ? "\u00A0" : a}</p>)
     }</h1>
    </div>
  )
}

export default Welcome