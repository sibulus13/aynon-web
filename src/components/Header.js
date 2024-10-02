import { FaLocationDot } from "react-icons/fa6";
import { canadianAnimals } from '@/lib/user';
import { IoMdGlasses } from "react-icons/io";
import { IoMdArrowBack } from 'react-icons/io';
import { IoIosSend } from "react-icons/io";

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

    function showPostButton() {
        if (page === 'post' || page === 'comment' || page === 'feedback') {
            return { visibility: 'visible', disabled: false };
        };
        return { visibility: 'hidden', disabled: true };
    }

    return (
        <div>
            <h1 className='text-center flex gap-2 justify-center'>
                <FaLocationDot />
                {region}</h1>
            <div className="flex gap-2 justify-between">
                <button>
                    <IoMdArrowBack
                        onClick={back}
                        className='text-2xl'
                        disabled={showBackButton().disabled}
                        visibility={showBackButton().visibility}
                    />
                </button>
                {page === 'post' && (
                    <div className='flex'>
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
                {/* <button>
                    <IoIosSend
                        onClick={() => send()}
                        className="text-2xl font-semibold disabled:text-gray-300"
                        disabled={showPostButton().disabled}
                        visibility={showPostButton().visibility}
                    >
                    </IoIosSend>
                </button> */}
            </div>
        </div>
    )
}