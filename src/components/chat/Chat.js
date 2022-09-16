import "./Chat/Chat.scss";
import pic from "../chat/man.png"
const Chat = ({ id }) => {
  const style = {
    height: 600,
  };
  return (
    <div style={style} className="chat-App">
      <div className="header">
        <div className="left">
            <div className="actions">
          <button> New Message</button>
        </div>
        </div>

        <div className="content">
          <h2>Title</h2>
        </div>

        <div className="right">
          <div className="user-bar">
            <div className="profile-name"> User name</div>
            <div className="profile-image">
              <img
                src={pic}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="sidebar-left">Sidebar-Left</div>
        <div className="content">content</div>
        <div className="sidebar-right">Sidebar-right</div>
      </div>
    </div>
  );
};

export default Chat;
