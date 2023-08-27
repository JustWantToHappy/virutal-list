import React from 'react'
import { fetchData } from "./utils";
import VirtualList from "./VirtualList";

import "./App.css";

function App() {
  const data = fetchData();

  const components = React.useMemo(() => {
    return data.map((message, index) => <div key={message.id} data-index={index}>{index}&emsp;{message.info}</div>)
  }, [data])

  return (
    <div className="App">
      <VirtualList components={components} />
    </div>
  );
}

export default App;
