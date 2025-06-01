// submit.js
import { handleSubmit } from "./api/api";
export const SubmitButton = () => {

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f0f2f5',
            }}
        >
            <button
                type="submit"
                style={{
                    padding: '12px 24px',
                    backgroundColor: '#1E2535',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#3C465A')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#1E2535')}
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>

    );
}
