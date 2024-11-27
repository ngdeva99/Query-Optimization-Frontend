import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../api/api';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

export const ResultsViewer = ({ joinResult }) => {
    const { data: performanceData } = useQuery(
        ['performance', joinResult?.joinId],
        () => api.analyzePerformance(joinResult.joinId),
        {
            enabled: !!joinResult?.joinId
        }
    );

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            
            {joinResult && (
                <div className="mb-4">
                    <h3 className="font-bold mb-2">Join Statistics</h3>
                    <p>Number of tuples: {joinResult.tupleCount}</p>
                    <p>Result attributes: {joinResult.attributes.join(', ')}</p>
                </div>
            )}

            {performanceData && (
                <div>
                    <h3 className="font-bold mb-2">Performance Analysis</h3>
                    <BarChart
                        width={500}
                        height={300}
                        data={[
                            {
                                name: 'Execution Time',
                                value: performanceData.executionTime
                            },
                            {
                                name: 'Memory Usage (MB)',
                                value: performanceData.memoryUsage / (1024 * 1024)
                            }
                        ]}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </div>
            )}
        </div>
    );
};