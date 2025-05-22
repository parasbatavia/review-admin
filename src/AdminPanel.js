import React, { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReplies = async () => {
    setLoading(true);
    const res = await fetch('/pending-replies');
    const data = await res.json();
    setReplies(data);
    setLoading(false);
  };

  const approveReply = async (reviewId, finalReply) => {
    await fetch('/approve-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewId, finalReply }),
    });
    fetchReplies();
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  if (loading) return <p style={{ padding: '1rem' }}>Loading pending replies...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Pending Review Replies
      </h1>
      {replies.length === 0 && <p>No pending replies 🎉</p>}
      {replies.map(({ reviewId, review, reply }) => (
        <div key={reviewId} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Review:</strong> {review}</p>
          <textarea
            value={reply}
            rows={4}
            style={{ width: '100%', marginTop: '0.5rem' }}
            onChange={(e) => setReplies(prev => prev.map(r =>
              r.reviewId === reviewId ? { ...r, reply: e.target.value } : r
            ))}
          />
          <button
            onClick={() => approveReply(reviewId, reply)}
            style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Approve & Post
          </button>
        </div>
      ))}
    </div>
  );
}
