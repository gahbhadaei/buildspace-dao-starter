import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import LatexExpression from './components/LatexExpression'



const App = () => {
  // Use the hooks thirdweb give us.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address);

  // Initialize our editionDrop contract

  const editionDrop = useEditionDrop(process.env.REACT_APP_EDITION_DROP_ADDRESS);
  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // isClaiming lets us easily keep a loading state while the NFT is minting.
  const [isClaiming, setIsClaiming] = useState(false);
  const [answerState, setAnswerState] = useState(-1);

  const clickedIncorrectAnswer = () => {
    setAnswerState(0);
  };

  const clickedCorrectAnswer = () => {
    setAnswerState(1);
  };

  const questionExpression = '$$\\quad y=2\\int_{-1}^{1}\\sqrt{1-x^2}dx$$';

  useEffect(() => {
    // If they don't have an connected wallet, exit!
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a Calculus Crytpo Credential NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a Calculus Crypto Credential NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to Crypto Credentials</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>Congratulations on knowing some calculus!</h1>
      </div>
    );
  };




  if (answerState == -1) {
    return (
      <div className="landing">
        <h2>Solve the following equation.</h2>
        <h2><LatexExpression expression={questionExpression} /></h2>
        <button className='button' style={{ textTransform: "lowercase", margin: "5px" }} onClick={clickedIncorrectAnswer}><LatexExpression expression='$$y=e$$' /></button>

        <button className='button' style={{ textTransform: "lowercase", margin: "5px" }} onClick={clickedCorrectAnswer}><LatexExpression expression='$$y=\pi$$' /></button>

        <button className='button' style={{ textTransform: "lowercase", margin: "5px" }} onClick={clickedIncorrectAnswer}><LatexExpression expression='$$y=\sqrt{2}$$' /></button>

        <button className='button' style={{ textTransform: "lowercase", margin: "5px" }} onClick={clickedIncorrectAnswer}><LatexExpression expression='$$y=1$$' /></button>
      </div>);
  }

  if (answerState == 0) {
    return (
      <div className="landing">
        <h2>You selected the wrong answer. You need to learn some calculus to earn this Calculus Crypto Credential NFT. Refresh the page to try again.</h2>

      </div>);
  }

  if (answerState == 1) {
    return (
      <div className="mint-nft">
        <h2>You selected the correct answer. You must know some calculus! Click the button below to mint your Calculus Crypto Credential NFT.
        </h2>
        <button
          disabled={isClaiming}
          onClick={mintNft}
        >
          {isClaiming ? "Minting..." : "Mint your NFT"}
        </button>
      </div>);



    // // Render mint nft screen.
    // return (
    //   <div className="mint-nft">
    //     <h1>Mint your Calculus Crypto Credential NFT</h1>
    //     <button
    //       disabled={isClaiming}
    //       onClick={mintNft}
    //     >
    //       {isClaiming ? "Minting..." : "Mint your NFT"}
    //     </button>
    //   </div>
    // );
  }
}

export default App;