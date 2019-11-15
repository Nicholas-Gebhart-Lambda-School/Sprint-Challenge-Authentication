import React, { useEffect, useState } from "react";
import getJokes from "../../services/getJokes";

const Jokes = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    getJokes().then(res => setJokes(res.data));
  }, []);

  return <pre>{JSON.stringify(jokes, null, 4)}</pre>;
};

export default Jokes;
