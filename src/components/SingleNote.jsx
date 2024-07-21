import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SingleNote() {
  const { notes } = useSelector((state) => state.notes);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const singleNote = notes.find((note) => note.id === id);

  
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className='p-5 min-h-screen bg-gray-900 flex flex-col items-center'>
      <button
        onClick={handleBack}
        className='p-2 mb-5 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300'
      >
        Back to Notes
      </button>
      
      {singleNote ? (
        <div className='w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6'>
          <h1 className='text-2xl font-bold text-white mb-4'>{singleNote.title}</h1>
          <p className='text-gray-300'>{singleNote.description}</p>
        </div>
      ) : (
        <div className='w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6 text-center'>
          <h1 className='text-xl font-bold text-white'>Note not found</h1>
        </div>
      )}
    </div>
  );
}

export default SingleNote;
