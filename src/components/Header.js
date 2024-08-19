import { FaLocationDot } from "react-icons/fa6";
import { canadianAnimals } from '@/lib/user';
import { IoMdGlasses } from "react-icons/io";
import { IoMdArrowBack } from 'react-icons/io';

export default function Header({ region, userAnimal, setUserAnimal, page, back }) {
    function setAnimal(e) {
        setUserAnimal(e.target.value);
        localStorage.setItem('userAnimal', e.target.value);
    }

    function isHome() {
        return page === 'forum';
    }

    return (
        <div>
            <h1 className='text-center flex gap-2 justify-center'>
                <FaLocationDot />
                {region}</h1>
            <div className="flex gap-2 justify-stretch">
                <button>
                    <IoMdArrowBack
                        onClick={back}
                        className='text-3xl'
                        disabled={isHome()}
                        visibility={isHome() ? 'hidden' : 'visible'}
                    />
                </button>
                <br></br>
                <IoMdGlasses className="text-3xl" />
                <select
                    className="text-center"
                    value={userAnimal}
                    onChange={setAnimal}
                >
                    {canadianAnimals.map((animal, index) => (
                        <option key={index} value={animal}>{animal}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}