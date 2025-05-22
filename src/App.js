import React, { useEffect, useState } from 'react';
import AdminPanel from './AdminPanel';
import axios from 'axios';

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingReplies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE}/gmb/pending-replies`
        );
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching pending replies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingReplies();
  }, []);

  return (
    <div>
      <h1>Pending Reviews</h1>
      {loading ? <p>Loading pending replies...</p> : <AdminPanel reviews={reviews} />}
    </div>
  );
}

export default App;
