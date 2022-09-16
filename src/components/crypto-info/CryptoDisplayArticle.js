import React from "react";
import pic from "./Cryptoinfo-style/coin2.png";
import "./Cryptoinfo-style/CryptoDisplayArticle.scss";
const CryptoDisplayArticle = ({}) => {
  return (
    <>
      <div className="article-container">
        <img classname="article-img" src={pic} />

        <div className="article-title">
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        </div>

        <div className="article-p">
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </div>

        <div className="btns-display-article">
          <div className="article-button1">
            <button>Like</button>
          </div>

          <div className="article-button2">
            <button>Tip</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CryptoDisplayArticle;
