import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { api } from '../api/api';

export const DatasetLoader = ({ onDatasetLoaded }) => {
    const [selectedTables, setSelectedTables] = useState(['movie', 'cast', 'actor']);
    
    const loadDatasetMutation = useMutation(
        (tables) => api.loadDataset('JOB', tables),
        {
            onSuccess: (data) => {
                onDatasetLoaded(data.relations);
            }
        }
    );

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Load Dataset</h2>
            <div className="flex flex-wrap gap-2 mb-4">
                {['movie', 'cast', 'actor'].map(table => (
                    <label key={table} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedTables.includes(table)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedTables([...selectedTables, table]);
                                } else {
                                    setSelectedTables(selectedTables.filter(t => t !== table));
                                }
                            }}
                            className="mr-2"
                        />
                        {table}
                    </label>
                ))}
            </div>
            <button
                onClick={() => loadDatasetMutation.mutate(selectedTables)}
                disabled={loadDatasetMutation.isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {loadDatasetMutation.isLoading ? 'Loading...' : 'Load Dataset'}
            </button>
        </div>
    );
};