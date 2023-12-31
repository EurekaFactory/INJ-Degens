import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

const WebsiteComponent = () => {
  return (
    <div className="webpage ">
      <header className="">
{/* Header Section*/}
        <nav className="w-full flex-row justify-between items-center md:flex">
          <div className="flex flex-row max-sm:justify-center items-center gap-5 lg:gap-8 xl:gap-10 text-2xl xl:text-3xl">
            <img src= {logo} alt="logo" className="w-[40px] my-2 rounded-full overflow-hidden shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black"></img>
            <p>Injective Degens</p>
          </div>
          
          <div className="flex flex-row justify-between items-center max-sm:hidden lg:gap-8 xl:gap-10">
            <a href="#about">About</a>
            <a href="#disclaimer">Legal Disclaimer</a>
            <Link to='/project'>Buy Now</Link>
            <a href="https://x.com/InjectiveDegens" target="_blank" rel="noopener noreferrer"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg></a>
            <a href="https://t.me/injectiveDgnz" target="_blank" rel="noopener noreferrer"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path></svg></a>
          </div>
        </nav>
      </header>

      <main className="text-2xl max-sm:mx-0 max-sm:text-lg">
{/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center w-full md:pt-8 lg:pt-12 xl:pt-16">
          <div className="flex flex-col items-center lg:items-start justify-start gap-8 m-[40px_0px]">
            <h1 className="font-bold text-7xl max-sm:text-5xl md:text-6xl lg:text-9xl xl:text-8xl">INJECTIVE DEGENS</h1>
            <h3 className=" text-3xl md:text-4xl lg:text-5xl xl:text-5.5xl leading-none text-center md:text-left">DEGENS WILL DEGEN</h3>
            <div className="flex flex-col md:flex-row gap-3 lg:gap-5 xl:gap-7 items-center mt-0 lg:mt-6 xl:mt-8">
              <a href="https://t.me/injectiveDgnz" target="_blank" rel="noopener noreferrer" className="border-2 bg-yellow-400 hover:bg-yellow-500 text-black border-b w-full shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black text-center text-3xl max-sm:text-2xl xl:text-4xl transition-all duration-500 rounded-xl lg:rounded-2xl py-2 px-6 max-sm:px-3 max-sm:py-1 hover:-translate-y-1">TELEGRAM</a>
              <Link to='/project' rel="noopener noreferrer" className="border-2 bg-yellow-400 hover:bg-yellow-500 text-black shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black text-center text-3xl max-sm:text-2xl xl:text-4xl transition-all duration-500 rounded-xl lg:rounded-2xl py-2 px-6 max-sm:px-3 max-sm:py-1 hover:-translate-y-1">BUY NOW</Link>
            </div>
          </div>
          <img src={logo} alt="$DGNZ" className="w-[250px] max-sm:w-[200px] md:w-[325px] lg:w-[375px] xl:w-[300px] 2xl:w-[500px] rounded-full overflow-hidden shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black"></img>
        </div>
        {/* <div id="home" className='hero m-[40px_0px]'>
          <h1 className='text-white'>Hello</h1>
        </div> */}

{/*About Section*/}
        <div id='about' className='about m-[40px_0px] p-5 border rounded-xl'>
          <h2 className='text-4xl max-sm:text-2xl font-bold'>ABOUT INJECTIVE DEGENS</h2>
          <p>
            $DGNZ born for Injective degens a community based token for Injective fan bois .
          </p>
        </div>

        <div className='m-[40px_0px] p-5 border rounded-xl'>
        <h2 className='text-4xl max-sm:text-2xl font-bold'>OUR VISION</h2>
          <p>
          $Dgnz is created by degens for degens. Our vision is to establish a strong foundation for crypto enthusiasts on Injective. Degen Dao will thus be created to formulate and accelerate this growth.
          </p>
        </div>

{/* Tokenomics section */}
        <div className='m-[40px_0px] text-left p-5 border rounded-xl'>
        <h2 className='text-4xl max-sm:text-2xl max-sm:text-center underline font-bold'>$TOKENOMICS</h2>
          <p>NAME:---------INJECTIVEDGEN</p>
          <p>TYPE:-----------CW20</p>
          <p>PLATFORM:-----INJ</p>
          <p>TOTAL SUPPLY:-21,000,000,000</p>
          <p>SYMBOL:-------$DGNZ</p>
        </div>

{/* Roadmap Section */}
        <div className='m-[40px_0px] text-left p-5 border rounded-xl'>
        <h2 className='text-4xl max-sm:text-2xl max-sm:text-center underline font-bold'>ROADMAP</h2>
          <h3 className="font-bold underline">Q1</h3>
          <ul>
            <li>* Token Drop and NFT mint. Colabs with projects. Airdrops for Holders. Establish the Degen Dao.</li>
          </ul>

          <h3 className="font-bold underline">Q2</h3>
          <ul>
            <li>* Staking Release.</li>
            <li>* Stake to earn $DGNZ.</li>
            <li>* Collaborations with other NFTprojects.</li>
            <li>* Partnerships with exchanges to list $DGNz.</li>
          </ul>

          <h3 className="font-bold underline">Q3</h3>
          <ul>
            <li>* Game development and Release.</li>
            <li>* Users can earn $DGNZ in gameplay.</li>
            <li>* Merch Release.</li>
            <li>* Further collaborations with projects and exchanges.</li>
          </ul>

          <h3 className="font-bold underline">Q4</h3>
          <ul>
            <li>* Injective degens gen 02 mint</li>
          </ul>
        </div>

{/* Disclaimer Section */}
        <div id='disclaimer' className='disclaimer m-[40px_0px] p-5 border rounded-xl'>
          <h2 className='text-4xl max-sm:text-2xl font-bold'>LEGAL DISCLAIMER</h2>
          <p>
          <strong>It is requested to read this legal disclaimer section with full attention.</strong><br></br>
          In any doubt, the consultancy shall be taken from the legal, financial, tax, or other professional law practitioners. All the information given below is not presented exhaustively and can never be considered part of various contractual relationships. We desire that the information provided in this white paper should be accurate, up to date, and all the products, services, technical architecture, coin distribution, and company timelines remain static. All materials are subject to change without notice, and they cannot be considered a binding agreement of professional advice. This white paper does not bind any individual to enter into any contract or enter into any binding legal commitment to the contribution. This white paper also does not have any capacity to bind any person to enter into any contract or consider it a binding legal obligation to the assistance of the whitepaper. As a result of this publication, distribution, dissemination does not imply the applicable laws, the regulatory requirements, and the available regulations.
          </p>
        </div>

{/* Contact */}
        <div className='m-[40px_0px] text-left p-5 border rounded-xl'>
        <h2 className='text-4xl max-sm:text-2xl text-center font-bold'>CONTACT INFORMATION</h2>
        <div className='flex justify-center p-5'>
          <a className="px-5" href="https://x.com/InjectiveDegens" target="_blank" rel="noopener noreferrer"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>Twitter</a>

          <a className="px-5" href="https://t.me/injectiveDgnz" target="_blank" rel="noopener noreferrer"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path></svg>Telegram</a>
        </div>
        </div>
      </main>
      <footer>
      <p className="copyright">&copy; INJ-$DGNZ 2023</p>
      </footer>
    </div>
  );
};


export default WebsiteComponent;
