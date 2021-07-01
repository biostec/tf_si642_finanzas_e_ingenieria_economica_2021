import React, { useState } from "react";
import { Tweet } from "react-twitter-widgets";

const Noticias = () => {
  const [arrTweetId] = useState([
    {
      id: "1410359147237982211",
    },
    {
      id: "1362560106643226634",
    },
    {
      id: "1362559190980526083",
    },
    {
      id: "1410620567124733958",
    },
    {
      id: "1410674566280667136",
    },
    {
      id: "1410677671483355136",
    },
  ]);
  return (
    <div>
      <h3>Últimas Noticias</h3>
      <div className="container mt-4 text-center">
        {arrTweetId.map((tweet) => {
          return (
            <div className="offset-3">
              <Tweet tweetId={tweet.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Noticias;
