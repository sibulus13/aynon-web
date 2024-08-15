import { FaLocationDot } from "react-icons/fa6";

export default function Header({ region }) {
    return (
        <div>
            {/* <h1 className='text-4xl font-bold text-center py-4'>Aynon</h1> */}
            <h1 className='text-center flex gap-2 justify-center'>
                <FaLocationDot />
                {region}</h1>
        </div>
    )
}