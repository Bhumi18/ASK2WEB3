/********************* DEPENDENCIES ********************/
import React, { useState, useRef, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // react-router v4/v5
import Cookies from "universal-cookie";

/********************* WEB3 DEPENDENCIES ********************/
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
// import Web3 from 'web3';
import { ethers } from "ethers";

/********************* IMAGES ********************/
import metamask from "./components/mm.png";
import coinbase from "./components/cbw.png";
// import walletconnect from "./components/wc.png";

/********************* COMPONENTS ********************/
import Navbar from "./components/Navbar";
import Home from "./components/homepage/Home";
import CryptoInfo from "./components/crypto-info/CryptoInfo";
import AddQuestions from "./components/questions/AddQuestions";
import DisplayQuestions from "./components/questions/DisplayQuestions";
import SingleQuestion from "./components/questions/SingleQuestion";
import AddArticle from "./components/questions/AddArticle";
import Chat from "./components/chat/Chat";
import Profile from "./components/users/Profile";
import FindUsers from "./components/users/FindUsers";
import SingleUser from "./components/users/SingleUser";
import Login from "./components/login/Login";
import ByToken from "./components/users/token/ByToken";
import CryptoDisplayArticle from "./components/crypto-info/CryptoDisplayArticle";

/********************* CSS CLASS ********************/
import "./index.css";
import "./App.scss";

import Stack from "./artifacts/contracts/Stack.sol/Stack.json";
import customToken from "./artifacts/contracts/customToken.sol/customToken.json";

const StackAddress = "0x6cc1A5F4C7187e5C6D52Fb6c51fcE68f52E7d8F8";
const customTokenAddress = "0x869A6aD54952b2F3C4215d27789d8DF1b3F5d730";

const App = () => {
  const { activate, deactivate } = useWeb3React();
  const [openWalletOption, setOpenWalletOption] = useState(false);
  // const [address, setAddress] = useState("");
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  //
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [tokenContract, setTokenContract] = useState({});
  const [mainContract, setMainContract] = useState({});
  let [error, setErr] = useState(null);

  const web3Handler = async () => {
    let accounts = await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .catch((err) => {
        error = err.code;
        setErr(error);
      });
    setAccount(connected);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let networkName = await provider.getNetwork();
    let chainId = networkName.chainId;
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    if (chainId !== 80001) {
      alert("Please connect to mumbai network");
    }
    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(connected);
      await web3Handler();
    });
    loadContracts(signer);
  };
  const loadContracts = async (signer) => {
    const tokencontract = new ethers.Contract(
      customTokenAddress,
      customToken.abi,
      signer
    );
    setTokenContract(tokencontract);
    const maincontract = new ethers.Contract(StackAddress, Stack.abi, signer);
    setMainContract(maincontract);
    setLoading(false);
    // console.log("token")
    // console.log(tokenContract)
    // console.log("contract")
    // console.log(maincontract)
  };

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const cookie = new Cookies();

  const connected = cookie.get("account");

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 3, 4, 5, 42, 137],
  });

  // const WalletConnect = new WalletConnectConnector({
  //   rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  //   bridge: "https://bridge.walletconnect.org",
  //   qrcode: true,
  // });

  // const Injected = new InjectedConnector({
  //   supportedChainIds: [1, 3, 4, 5, 42, 137]
  // });

  const wrapperRef = useRef(null);

  window.ethereum.on("accountsChanged", function (accounts) {
    let acc = accounts[0];
    if (!acc) {
      setIsConnected(false);
      cookie.remove("account");
      window.location.reload();
    }
  });

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
    if (setIsConnected(true)) {
      console.log("yes");
    }
  }, [ethereum]);

  useEffect(() => {
    if (connected) {
      web3Handler();
    }
  }, [connected]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      cookie.set("account", accounts[0], { path: "/", maxAge: 3600 });
      setAccountBalance(bal);
      setIsConnected(true);
      setOpenWalletOption(false);
    } catch (error) {
      setIsConnected(false);
    }
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /*
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenWalletOption(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <>
      <div className="App">
        <Router>
          <Navbar setOpenWalletOption={setOpenWalletOption} />
          <div className="main-content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/info"
                element={
                  <CryptoInfo
                    tokenContract={tokenContract}
                    mainContract={mainContract}
                    web3Handler={web3Handler}
                    account={account}
                  />
                }
              />
              <Route
                path="/ask-question"
                element={
                  <AddQuestions
                    tokenContract={tokenContract}
                    mainContract={mainContract}
                    web3Handler={web3Handler}
                    account={account}
                  />
                }
              />
              <Route
                path="/find-question"
                element={
                  <DisplayQuestions
                    tokenContract={tokenContract}
                    mainContract={mainContract}
                    web3Handler={web3Handler}
                    account={account}
                  />
                }
              />
              <Route
                path="/single-question/"
                element={
                  <SingleQuestion
                    id={1}
                    tokenContract={tokenContract}
                    mainContract={mainContract}
                    web3Handler={web3Handler}
                    account={account}
                  />
                }
              />
              <Route
                path="/add-article"
                element={
                  <AddArticle
                    tokenContract={tokenContract}
                    mainContract={mainContract}
                    web3Handler={web3Handler}
                    account={account}
                  />
                }
              />
              <Route path="/message" element={<Chat id={1} />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    mainContract={mainContract}
                    web3Handler={web3Handler}
                    account={account}
                  />
                }
              />
              <Route
                path="/find-profile"
                element={
                  <FindUsers
                    mainContract={mainContract}
                    web3Handler={web3Handler}
                    account={account}
                  />
                }
              />
              <Route
                path="/user/"
                element={
                  <SingleUser
                    tokenContract={tokenContract}
                    mainContract={mainContract}
                    web3Handler={web3Handler}
                    account={account}
                  />
                }
              />
              <Route
                path="/buytoken"
                element={
                  <ByToken
                    tokenContract={tokenContract}
                    mainContract={mainContract}
                    web3Handler={web3Handler}
                    account={account}
                  />
                }
              />

              <Route
                path="/displayarticle"
                element={
                  <CryptoDisplayArticle
                    tokenContract={tokenContract}
                    mainContract={mainContract}
                    web3Handler={web3Handler}
                    account={account}
                  />
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
        {openWalletOption ? (
          <div className="alert-main">
            <div className="alert-box" ref={wrapperRef}>
              <div className="alert-header">
                <div className="title">CONNECT</div>
              </div>
              <div className="alert-container">
                <div className="alert-holder">
                  <div className="image">
                    <img
                      src={metamask}
                      onClick={() => {
                        connectWallet();
                      }}
                      title="metamask"
                      className="mm"
                      alt="metamask"
                    />
                  </div>
                  <div className="image">
                    <img
                      src={coinbase}
                      onClick={() => {
                        activate(CoinbaseWallet);
                      }}
                      title="coinbase"
                      className="mm"
                      alt="coinbase"
                    />
                  </div>
                  {/* <div className='image'>
                      <img src={walletconnect} onClick={() => { activate(WalletConnect) }} className="mm" alt="wallet connect image" />
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default App;
