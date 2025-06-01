import { useStore } from '../store';

const baseUrl = "http://localhost:8000";
const postHeaders = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export const handleSubmit = async () => {
    const { nodes, edges } = useStore.getState();
    console.log(nodes, edges);


    try {
        const response = await fetch(`${baseUrl}/pipelines/parse`, {
            ...postHeaders,
            body: JSON.stringify({ nodes, edges })
        });

        const data = await response.json();

        alert(`Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
    } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to submit pipeline.');
    }
};
