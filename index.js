function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState({});
  const [color, setColor] = React.useState("#FF5733");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      setQuotes(data);
      let randIndex = Math.floor(Math.random() * data.length);
      setRandomQuote(data[randIndex]);
    }
    fetchData();
  }, []);

  const getNewQuote = () => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#5733FF",
      "#FF33A1",
      "#33FFF5",
      "#F5FF33",
      "#A133FF",
      "#FF8C33",
      "#33FFA1",
      "#33FF8C",
      "#8C33FF",
      "#FFA133",
      "#33A1FF",
      "#FF33F5",
      "#F533FF",
      "#33FF33",
      "#A1FF33",
      "#33A1A1",
      "#FF5733",
    ];

    let randIndex = Math.floor(Math.random() * quotes.length);
    let randColorIndex = Math.floor(Math.random() * colors.length);
    setRandomQuote(quotes[randIndex]);
    setColor(colors[randColorIndex]);
  };

  return (
    <div style={{ backgroundColor: color, minHeight: "100vh" }}>
      <div className="container pt-5">
        <div className="jumbotron" id="quote-box">
          <div className="card">
            <div className="card-header">Motivational Quotes</div>
            <div className="card-body">
              {randomQuote ? (
                <>
                  <h5 className="card-title" id="author">
                    -{randomQuote.author || "No author"}
                  </h5>
                  <p className="card-text" id="text">
                    &quot;{randomQuote.text}&quot;
                  </p>
                </>
              ) : (
                <h2>Loading</h2>
              )}

              <div className="row">
                <button
                  onClick={getNewQuote}
                  className="btn btn-primary ml-3"
                  id="new-quote"
                >
                  New Quote
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `"${randomQuote.text}" - ${randomQuote.author}`
                  )}`}
                  className="btn btn-warning mt-3"
                  id="tweet-quote"
                  target="_blank"
                >
                  <i className="fab fa-twitter"></i> Tweet
                </a>
                <a
                  href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,inspirational&caption=${encodeURIComponent(
                    randomQuote.author
                  )}&content=${encodeURIComponent(
                    randomQuote.text
                  )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
                  className="btn btn-danger mt-3"
                  id="tumblr-quote"
                  target="_blank"
                >
                  <i className="fab fa-tumblr"></i> Tumblr
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
