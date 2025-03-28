import "../PagesList/PagesList.css";

const PagesList = ({ active }) => {
  return (
    <div className="pages-container">
      <button className={active === 1 ? "page active-page" : "page"}>
        Home
      </button>
      <button className={active === 2 ? "page active-page" : "page"}>
        Presentation
      </button>
      <button className={active === 3 ? "page active-page" : "page"}>
        Real Scenario
      </button>
      <button className={active === 4 ? "page active-page" : "page"}>
        Ai Chatting
      </button>
    </div>
  );
};

export default PagesList;
