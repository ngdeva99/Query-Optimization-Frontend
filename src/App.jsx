import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DatasetLoader } from './components/DatasetLoader';
import { JoinBuilder } from './components/JoinBuilder';
import { ResultsViewer } from './components/ResultsViewer';

const queryClient = new QueryClient();

function App() {
    const [loadedRelations, setLoadedRelations] = useState([]);
    const [joinResult, setJoinResult] = useState(null);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Yannakakis Algorithm Visualizer</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <DatasetLoader onDatasetLoaded={setLoadedRelations} />
                        {loadedRelations.length > 0 && (
                            <JoinBuilder
                                availableRelations={loadedRelations}
                                onJoinComplete={setJoinResult}
                            />
                        )}
                    </div>
                    
                    <div>
                        <ResultsViewer joinResult={joinResult} />
                    </div>
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default App;