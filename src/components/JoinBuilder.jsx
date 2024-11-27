import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { api } from '../api/api';

export const JoinBuilder = ({ availableRelations, onJoinComplete }) => {
    const [selectedRelations, setSelectedRelations] = useState([]);
    const [joinConditions, setJoinConditions] = useState([]);

    const joinMutation = useMutation(
        () => api.performJoin(selectedRelations, joinConditions),
        {
            onSuccess: (data) => {
                onJoinComplete(data);
            }
        }
    );

    const addJoinCondition = () => {
        setJoinConditions([
            ...joinConditions,
            {
                relations: ['', ''],
                attributes: {}
            }
        ]);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Build Join</h2>
            
            <div className="mb-4">
                <h3 className="font-bold mb-2">Select Relations</h3>
                <div className="flex flex-wrap gap-2">
                    {availableRelations.map(relation => (
                        <label key={relation.id} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedRelations.includes(relation.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedRelations([...selectedRelations, relation.id]);
                                    } else {
                                        setSelectedRelations(selectedRelations.filter(id => id !== relation.id));
                                    }
                                }}
                                className="mr-2"
                            />
                            {relation.name}
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <h3 className="font-bold mb-2">Join Conditions</h3>
                {joinConditions.map((condition, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <select
                            value={condition.relations[0]}
                            onChange={(e) => {
                                const newConditions = [...joinConditions];
                                newConditions[index].relations[0] = e.target.value;
                                setJoinConditions(newConditions);
                            }}
                            className="border p-2 rounded"
                        >
                            <option value="">Select relation</option>
                            {availableRelations.map(relation => (
                                <option key={relation.id} value={relation.name}>
                                    {relation.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={condition.relations[1]}
                            onChange={(e) => {
                                const newConditions = [...joinConditions];
                                newConditions[index].relations[1] = e.target.value;
                                setJoinConditions(newConditions);
                            }}
                            className="border p-2 rounded"
                        >
                            <option value="">Select relation</option>
                            {availableRelations.map(relation => (
                                <option key={relation.id} value={relation.name}>
                                    {relation.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <button
                    onClick={addJoinCondition}
                    className="bg-gray-200 px-4 py-2 rounded"
                >
                    Add Join Condition
                </button>
            </div>

            <button
                onClick={() => joinMutation.mutate()}
                disabled={joinMutation.isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {joinMutation.isLoading ? 'Processing...' : 'Execute Join'}
            </button>
        </div>
    );
};