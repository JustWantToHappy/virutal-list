import React from 'react'
import { fetchData } from "./utils";
import VirtualList from "./VirtualList";
import VirtualListUpgrade from './VirtualListUpgrade';

import "./App.css";

function App() {
  const data = fetchData();
  const [normal, setNormal] = React.useState(true)

  const components = React.useMemo(() => {
    return data.map((message, index) => <div key={message.id} data-index={index}>{index}&emsp;{message.info}</div>)
  }, [data])

  const shift = () => {
    setNormal(normal => !normal)
  }

  return (
    <div className="app">
      {normal ? <VirtualList components={components} /> : <div
        style={{ marginTop: '200px' }}>
        <VirtualListUpgrade components={components} extraRenderCount={0} />
      </div>}
      <div className='btn'>
        <button
          onClick={shift}
        >
          切换模式
        </button>
      </div>
    </div>
  );
}

export default App;
