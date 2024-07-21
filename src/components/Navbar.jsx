import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterNotes } from '../Features/notesSice';
import { toast } from 'react-toastify';

function Navbar() {
    const [title, setTitle] = useState('');
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [menuButton, setMenuButton] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const { filterNotes: filteredNotes, noFilterNotes } = useSelector((state) => state.notes);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleWidth = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWidth);

        return () => {
            window.removeEventListener('resize', handleWidth);
        };
    }, []);

    useEffect(() => {
        setMenuButton(screenWidth < 674);
    }, [screenWidth]);

    useEffect(() => {
        if (searchPerformed && noFilterNotes) {
            toast.error('No matching note !', {
                position: "top-right",
                autoClose: 1000,
            });
            setSearchPerformed(false);
        }
    }, [noFilterNotes, searchPerformed]);

    function showDropDown() {
        setDropDown(true);
    }

    function closeDropDown() {
        setDropDown(false);
    }

    function searchNotes(event) {
        event.preventDefault();
        dispatch(filterNotes(title));
        setTitle('');
        setSearchPerformed(true);
    }

    return (
        <div className='bg-slate-700 p-5 sticky top-0 left-0 w-full z-50'>
            <div className='w-full text-white flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-semibold text-slate-300'>Keep Notes</h1>
                </div>
                {menuButton ? (
                    dropDown ? (
                        <i
                            onClick={closeDropDown}
                            className="fa-solid fa-xmark text-2xl font-semibold cursor-pointer text-red-600"
                        ></i>
                    ) : (
                        <i
                            onClick={showDropDown}
                            className="fa-solid fa-bars text-2xl font-semibold cursor-pointer"
                        ></i>
                    )
                ) : (
                    <div>
                        <form onSubmit={searchNotes}>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Search your note by title'
                                value={title}
                                className='p-2 border rounded-lg text-slate-600'
                                type="text"
                            />
                            <button
                                className='bg-green-600 text-white font-semibold ml-3 p-2 rounded-lg'
                                type='submit'
                            >
                                Search
                            </button>
                        </form>
                    </div>
                )}
            </div>
            <div
                className={`transition-all duration-300 ease-in-out mt-5 ${dropDown ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <form onSubmit={searchNotes}>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Search your note by title'
                        value={title}
                        className='p-2 border rounded-lg text-slate-600'
                        type="text"
                    />
                    <button
                        className='bg-green-600 text-white font-semibold ml-2 mt-2 p-2 rounded-lg'
                        type='submit'
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Navbar;
