import React from "react";
import "./Cryptoinfo-style/Article.scss";
import pic from "./Cryptoinfo-style/coin.jpg";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const CryptoArticle = ({ account, mainContract }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [src, setsrc] = useState([]);
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  const navigateToDisplay = () => {
    // 👇️ navigate to /
    navigate("/displayarticle");
  };
  const getArticles = async (e) => {
    let articleNumbers = await mainContract.article_id();
    articleNumbers = parseInt(articleNumbers._hex, 16);
    console.log(articleNumbers);
    for (let i = 1; i <= articleNumbers; i++) {
      const cid = await mainContract.getArticle(i);
      const cidOfImage = cid.article_image_cid;
      if (cidOfImage == "No Image Found") {
        src.push(pic);
      } else {
        src.push(cidOfImage);
      }
    }
    setsrc(src);
    setLoading(false);
    console.log(src);
  };

  useEffect(() => {
    getArticles();
  }, [mainContract]);

  if (isLoading) {
    return "loading";
  }

  if (src.length > 0) {
    return (
      <>
        <div className="crypto-article">
          <div className="leftcolumn">
            <div className="article">
              <h2>Bitcoin</h2>
              <div>
                {src.map((inde) => {
                  return (
                    <div className="fakeimg">
                      <img className="crypto-img" src={inde} />
                      <p>title</p>
                      <button id="readmore" onClick={navigateToDisplay}>
                        Read More
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}
      </>
    );
  }
};
export default CryptoArticle;
