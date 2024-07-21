import React, { useState, useEffect } from 'react';
import Notes from './Notes';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, removeFilter, updateNotes } from '../Features/notesSice';
import { toast } from 'react-toastify';

function Dashboard() {
    const { isEdit, editDescription, editId, editTitle } = useSelector((state) => state.notes);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [inputTitle, setInputTitle] = useState('');
    const [description, setDescription] = useState('');

    function getTime() {
        let date = new Date()
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let month = months[date.getMonth()]
        let toadyDate = date.getDate()
        let year = date.getFullYear()

        let hour = date.getHours()
        let minutes = date.getMinutes()
        let period = hour >= 12 ? 'AM' : 'PM'

        let time = `${hour}:${minutes} ${period}`
        return `Added on ${toadyDate} ${month} ${year} ${time}`
    }

    console.log(getTime())

    const dispatch = useDispatch();

    const { filteredNotesEnable } = useSelector((state) => state.notes)

    console.log(filteredNotesEnable)

    function showAllNotes() {
        dispatch(removeFilter())
    }


    useEffect(() => {
        if (isEdit) {
            setInputTitle(editTitle);
            setDescription(editDescription);
            setIsFormOpen(true);
        } else {
            setIsFormOpen(false);
            setInputTitle('');
            setDescription('');
        }
    }, [isEdit, editTitle, editDescription]);

    useEffect(() => {
        setIsFormOpen(false)
    }, [])

    function toggleForm() {
        setIsFormOpen(prev => !prev);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (isEdit) {
            dispatch(updateNotes({ title: inputTitle, description, id: editId, time: getTime() }));
        } else {
            dispatch(addNote({ title: inputTitle, description, time: getTime() }));
        }
        setInputTitle('')
        setDescription('')
        setIsFormOpen(false);
    }

    return (
        <div className='text-white p-5'>
            {
                filteredNotesEnable ? <button
                    onClick={showAllNotes}
                    className='p-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300'
                >Show All notes</button> :
                    <button
                        onClick={toggleForm}
                        className='p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300'
                    >
                        {isFormOpen ? 'Close Form' : 'Add New Note'}
                    </button>
            }

            {!isFormOpen && <Notes />}

            <div
                className={`transition-all duration-500 ease-in-out mt-10 ${isFormOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <form
                    onSubmit={handleSubmit}
                    className='w-full sm:w-1/2 p-6 bg-slate-700 rounded-lg mx-auto shadow-lg transition-all duration-500 ease-in-out text-slate-100'
                >
                    <div className='flex flex-col gap-6'>
                        <label className='text-slate-200 font-semibold text-2xl' htmlFor="Title">
                            Title
                        </label>
                        <input
                            className='w-full p-4 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-slate-100 placeholder:text-slate-400 transition-shadow duration-300 hover:shadow-lg'
                            placeholder='Enter your note title'
                            type="text"
                            value={inputTitle}
                            onChange={(e) => setInputTitle(e.target.value)}
                        />
                        <label className='text-slate-200 font-semibold text-2xl' htmlFor="Description">
                            Description
                        </label>
                        <textarea
                            rows={6}
                            className='w-full p-4 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-slate-100 placeholder:text-slate-400 transition-shadow duration-300 hover:shadow-lg'
                            placeholder='Write your note'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button
                            type='submit'
                            className={`p-4 font-semibold rounded-xl shadow-md transition-colors duration-300 ${isEdit ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                                }`}
                        >
                            {isEdit ? 'Save changes' : 'Add Note'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Dashboard;
