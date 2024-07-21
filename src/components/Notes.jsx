import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeEditCredential, removeNote } from '../Features/notesSice';
import { toast } from 'react-toastify';

function Notes() {
    const { notes, filterNotes } = useSelector((state) => state.notes);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log('Notes from state:', notes); // Check the entire notes array

    function routeToSingleNotePage(note) {
        const { id, description } = note;
        if (description.length > 200) {
            navigate(`singleNote/${id}`);
        }
    }

    function deleteNote(id) {
        dispatch(removeNote(id));
    }

    function editTodo(note) {
        dispatch(changeEditCredential({ title: note.title, description: note.description, id: note.id }));
    }

    function copyNote(description){
        navigator.clipboard.writeText(description)
        toast.success('Note copied !', {
            position: "top-right",
            autoClose: 1000,
        });
    }

    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
            {notes.length === 0 ? (
                <h1 className='text-white text-center col-span-full mt-10 text-2xl'>No Notes Available</h1>
            ) : (
                (filterNotes.length !== 0 ? filterNotes : notes).map((note, index) => (
                    <div
                        key={index}
                        className='p-4 bg-slate-800 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer'
                    >
                        <div className='p-4'>
                            <div className='flex w-full justify-between items-center mb-2'>
                                <h2 className='text-xl font-bold text-white mb-2'>{note.title}</h2>
                        
                            </div>
                            <p
                                onClick={() => routeToSingleNotePage(note)}
                                className='text-gray-300'
                            >
                                {note.description.length > 200 ? note.description.substring(0, 200) + '...' : note.description}
                            </p>
                            {note.time ? <p className='text-gray-500 mt-3 text-sm'>{note.time}</p> : <p className='text-white'>No time available</p>}
                            <div className='space-x-3 mt-2 text-xl'>
                                    <i
                                        onClick={() => deleteNote(note.id)}
                                        className="fa-solid fa-trash text-red-500 cursor-pointer"
                                    ></i>
                                    <i
                                        onClick={() => editTodo(note)}
                                        className="fa-solid fa-pen-to-square text-blue-600 cursor-pointer"
                                    ></i>
                                    <i 
                                    onClick={()=>copyNote(note.description)}
                                    className="fa-solid fa-copy cursor-pointer"></i>
                                </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Notes;
