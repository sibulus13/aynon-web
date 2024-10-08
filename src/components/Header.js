import { FaLocationDot } from "react-icons/fa6";
import { canadianAnimals } from '@/lib/user';
import { IoMdGlasses } from "react-icons/io";
import { IoMdArrowBack } from 'react-icons/io';
import { UserButton } from '@clerk/nextjs'

export default function Header({ region, userAnimal, setUserAnimal, page, back, send }) {
    function setAnimal(e) {
        setUserAnimal(e.target.value);
        localStorage.setItem('userAnimal', e.target.value);
    }

    function showBackButton() {
        if (page === 'forum') {
            return { visibility: 'hidden', disabled: true };
        };

        return { visibility: 'visible', disabled: false };
    }

    function showAnimalSelector() {
        if (page === 'post' || page === 'comment') {
            return true;
        };
        return false;
    }

    return (
        <div>
            <h1 className='text-center flex gap-2 justify-center'>
                <FaLocationDot />
                {region}
            </h1>
            <div className="grid grid-cols-3 gap-2">
                <span className="grid-cols-1">
                    <button>
                        <IoMdArrowBack
                            onClick={back}
                            className='text-2xl'
                            disabled={showBackButton().disabled}
                            visibility={showBackButton().visibility}
                        />
                    </button>
                </span>
                <span className="grid-cols-1 flex justify-center">
                    <UserButton />
                </span>
                <span className="grid-cols-1">
                    {showAnimalSelector() && (
                        <div className='flex justify-end pt-2'>
                            <IoMdGlasses className="text-2xl" />
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
                    )}
                </span>
            </div>
        </div>
    )
}