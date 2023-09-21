import React, { useState, useEffect } from 'react';


const PageBuilder = (Component) => {
    const Page = (props)=>{

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  let response ;
  const loadData = async (fetchData) => {
    try {
      response = await fetchData();
      setData(response.data.body.value);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return <Component {...{data,loading,error,loadData}} {...props}/>
}
return Page;
};

export default PageBuilder;
