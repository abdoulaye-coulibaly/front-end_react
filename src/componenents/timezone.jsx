import React, { useState, useEffect } from "react";
function Timezone({ zone }) {
  const [name, setName] = useState("");
  const timeout = 3000;
  console.log(name);
  useEffect(() => {
    if (zone) {
    const fetchData = async () => {
      fetch(`https://timeapi.io/api/time/current/zone?TimeZone=${zone}`)
        .then((response) => response.json(), console.log(timeout))
        .then((result) => setName(result.time))
        .catch((error) => console.log("error", error));
    };
  const intervalId = setInterval(fetchData, timeout);
  return () => clearInterval(intervalId);
}
    // getposition(country)
  }, [zone]);
  return (
    <div className="App">
      {name ? <pre>{JSON.stringify(name, null, 2)}</pre> : name }
    </div>
  );
}

export default Timezone;