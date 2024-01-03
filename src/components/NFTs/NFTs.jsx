import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

const NFTs = () => {
  return (
    <div className="NFT ">
      {/* Header Section*/}
      <header className="">
        <nav className="w-full flex-row justify-between items-center md:flex">
          <div className="flex flex-row max-sm:justify-center max-md:justify-center items-center gap-5 lg:gap-8 xl:gap-10 text-2xl xl:text-3xl">
            <a href="#home">
              <img
                src={logo}
                alt="logo"
                className="w-[40px] my-2 rounded-full overflow-hidden shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black"
              ></img>
            </a>
            <p>Injective Degens</p>
          </div>

          <div className="flex flex-row justify-between items-center max-sm:hidden lg:gap-8 md:gap-6 xl:gap-10">
            <Link to="/project" className="underline decoration-yellow-500">
              Buy Now
            </Link>
            <Link to="/NFTs" className="underline decoration-yellow-500">
              NFTs
            </Link>
            <a href="#about" className="underline decoration-yellow-500">
              About
            </a>
            <a href="#disclaimer" className="underline decoration-yellow-500">
              Legal Disclaimer
            </a>
            {/* <Link to='/airdrop' className="underline decoration-yellow-500">Airdrop</Link> */}
            <a
              href="https://x.com/InjectiveDegens"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
              </svg>
            </a>
            <a
              href="https://t.me/injectiveDgnz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main id="home" className="text-2xl max-sm:mx-0 max-sm:text-lg">
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center w-full md:pt-8 lg:pt-12 xl:pt-16">
          <div className="flex flex-col w-3/4 items-center lg:items-start justify-start gap-8 m-[40px_0px] max-sm:m-[20px_0px]">
            <h1 className="font-bold text-left max-sm:text-3xl md:text-3xl sm:text-center lg:text-4xl xl:text-5xl">
              Discover, collect, and sell extraordinary NFTs
            </h1>
            <h3 className=" md:text-2xl lg:text-2xl xl:text-2xl leading-none text-center md:text-left">
              $DGNZ born for Injective degens a community based token for
              Injective fan bois.
            </h3>
            <div className="flex flex-col md:flex-row gap-3 lg:gap-5 xl:gap-7 items-center mt-0 lg:mt-6 xl:mt-8">
              <Link
                to="/NFTs"
                rel="noopener noreferrer"
                className="border-2 bg-yellow-400 hover:bg-yellow-500 text-black shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black text-center text-3xl max-sm:text-2xl xl:text-4xl transition-all duration-500 rounded-xl lg:rounded-2xl py-2 px-3 max-sm:px-3 max-sm:py-1 hover:-translate-y-1"
              >
                EXPLORE
              </Link>
              <a
                href="https://t.me/injectiveDgnz"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 bg-yellow-400 hover:bg-yellow-500 text-black border-b max-sm:w-full shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black text-center text-3xl max-sm:text-2xl xl:text-4xl transition-all duration-500 rounded-xl lg:rounded-2xl py-2 px-3 max-sm:px-3 max-sm:py-1 hover:-translate-y-1"
              >
                TELEGRAM
              </a>
              <Link
                to="/project"
                rel="noopener noreferrer"
                className="border-2 bg-yellow-400 hover:bg-yellow-500 text-black shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black text-center text-3xl max-sm:text-2xl xl:text-4xl transition-all duration-500 rounded-xl lg:rounded-2xl py-2 px-3 max-sm:px-3 max-sm:py-1 hover:-translate-y-1"
              >
                BUY NOW
              </Link>
            </div>
          </div>
          <div>
            <img
              src={logo}
              alt="$DGNZ"
              className="w-[250px] max-sm:w-[200px] md:w-[325px] lg:w-[375px] xl:w-[400px] overflow-hidden rounded-tl-[20%] rounded-br-[20%] shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black"
            ></img>
          </div>
        </div>

        {/* Numbers Section*/}
        <div className="flex max-sm:justify-center max-md:justify-center max-lg:justify-center m-[40px_0px] text-left">
          <div className="flex border rounded-3xl bg-yellow-50">
            <div className="p-5">
              <h3>20k +</h3>
              <p
                className="text-sm"
                href="https://x.com/InjectiveDegens"
                target="_blank"
                rel="noopener noreferrer"
              >
                Artwork
              </p>
            </div>

            <div className="p-5">
              <h3>13k +</h3>
              <p
                className="text-sm"
                href="https://t.me/injectiveDgnz"
                target="_blank"
                rel="noopener noreferrer"
              >
                Auction
              </p>
            </div>

            <div className="p-5">
              <h3>10k +</h3>
              <p
                className="text-sm"
                href="https://t.me/injectiveDgnz"
                target="_blank"
                rel="noopener noreferrer"
              >
                Artist
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p className="copyright">&copy; INJ-$DGNZ 2023</p>
      </footer>
    </div>
  );
};

export default NFTs;
