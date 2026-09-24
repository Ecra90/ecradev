import { useState } from "react";

function Admin() {
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchMessages = async (adminToken = token) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://https://ecradevbackend1.vercel.app/api/messages",
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to load messages.");
        setLoading(false);
        return;
      }

      setMessages(data.messages || []);
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    await fetchMessages(token);
  };

  const logout = () => {
    setToken("");
    setMessages([]);
    setLoggedIn(false);
    setError("");
  };
  const deleteMessage = async (messageId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://https://ecradevbackend1.vercel.app/api/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not delete message.");
        return;
      }

      setMessages((currentMessages) =>
        currentMessages.filter(
          (message) => message.id !== messageId
        )
      );

    } catch (error) {
      console.error(error);
      setError("Could not connect to the server.");
    }
  };
  if (!loggedIn) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <p className="admin-brand">ECRA DEV</p>

          <h1>Admin Login</h1>

          <p>
            Enter your admin token to access your messages.
          </p>

          <form onSubmit={login}>
            <input
              type="password"
              placeholder="Admin Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn primary"
              disabled={loading}
            >
              {loading ? "Checking..." : "Login"}
            </button>
          </form>

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">

      <div className="admin-header">

        <div>
          <p className="admin-brand">ECRA DEV</p>
          <h1>Dashboard</h1>
        </div>

        <div className="admin-actions">

          <button
            className="btn secondary"
            onClick={() => fetchMessages()}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>

          <button
            className="btn secondary"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

      <div className="admin-stats">

        <div className="stat-card">
          <span>Total Messages</span>
          <strong>{messages.length}</strong>
        </div>

        <div className="stat-card">
          <span>Latest Message</span>

          <strong>
            {messages.length > 0
              ? new Date(
                messages[0].created_at
              ).toLocaleDateString()
              : "None"}
          </strong>
        </div>

      </div>

      <div className="messages-container">

        <div className="messages-title">
          <div>
            <p className="admin-brand">
              INBOX
            </p>

            <h2>Contact Messages</h2>
          </div>
        </div>

        {messages.length === 0 ? (

          <div className="empty-messages">

            <h2>No messages yet</h2>

            <p>
              Messages submitted through your
              portfolio will appear here.
            </p>

          </div>

        ) : (

          messages.map((message) => (

            <article
              className="message-card"
              key={message.id}
            >

              <div className="message-header">

                <div>
                  <h3>{message.name}</h3>

                  <p className="message-email">
                    {message.email}
                  </p>
                </div>

                <span>
                  {new Date(
                    message.created_at
                  ).toLocaleString()}
                </span>

              </div>

              <div className="message-body">

                <p>
                  {message.message}
                </p>

              </div>
              <div className="message-actions">
                <button
                  className="delete-btn"
                  onClick={() => deleteMessage(message.id)}
                >
                  Delete
                </button>
              </div>
            </article>

          ))

        )}

      </div>

    </div>
  );
}

export default Admin;