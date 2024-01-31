
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './Loading';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

interface Product {
  id: number;
  title: string;
  description: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const [onSearch , setOnSearch] = useState(false);

  

 

  const tokenData = sessionStorage.getItem('token');
  const [sessionToken ,setSessionToken] = useState(tokenData);


  const navigate = useNavigate();

   
  if(sessionToken==null){
    return <div>
    <div className='flex flex-col w-full h-[100vh] justify-center items-center'>
      <div>Kindly Login to view Productsss</div>
      <div className='p-4 bg-indigo-500 cursor-pointer text-white' onClick={()=>{
        navigate('/login');
      }}>
        Click here to go to Login Page
      </div>
      </div>
    </div>
  }

  console.log('currentPage',currentPage);

  useEffect(() => {
    const tokenData = sessionStorage?.getItem('token');
    if(!tokenData || tokenData ==null){
      setSessionToken(null);
      return
    }
    let skipNumber = currentPage<=1 ? 0: (currentPage-1)*10;
    setLoading(true);
    axios.get(`https://dummyjson.com/auth/products?limit=10&skip=${skipNumber}`, {
      headers:{
        "Content-Type":'application/json',
        'Authorization': `Bearer ${tokenData}`
      }
    }).then((response)=>{
      const data = response.data.products;
      setProducts(data);
      setTotalResults(response.data.total);
      setLoading(false);
    }).catch((error)=>{
      console.log(error);
      setLoading(false);
    })

  }, [currentPage]);

  const handleSearch = () => {
    const tokenData = sessionStorage?.getItem('token');
    if(!tokenData || tokenData ==null){
      setSessionToken(null);
    }
    setLoading(true);
    searchTerm===''? setOnSearch(false):setOnSearch(true);
    axios.get(`https://dummyjson.com/auth/products/search?q=${searchTerm}&limit=10`, {
      headers:{
        "Content-Type":'application/json',
        'Authorization': `Bearer ${tokenData}`
      }
    }).then((response)=>{
      const data = response.data.products;
      console.log('data',data);
      setProducts(data);
      setLoading(false);
      setTotalResults(response.data.total);
      
    }).catch((error)=>{
      console.log(error);
      setLoading(false);
    });
  };

  return (<div> 
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="px-9 py-4 m-5 rounded rounded-lg bg-white max-w-4xl w-full space-y-8">
        <div className="text-center mt-4">
          <h2 className="text-3xl font-extrabold text-gray-900">Product Search</h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex mr-3">
            <input
              type="text"
              placeholder="Search by title"
              className="appearance-none rounded rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="button"
              className="ml-2 inline-flex items-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-black bg-white border-black hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {loading? <LoadingSpinner/>:
          <div className='flex flex-wrap gap-5'>
             
          {products.map((product) => (
            <Card id={product.id} title={product.title} description={product.description}/>
          ))}
          </div>}
          
          {!onSearch && searchTerm=='' ?<div className="flex justify-between mt-4 mr-3">
           {currentPage<=1 ? <div></div> :<button
              type="button"
              className="mr-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setCurrentPage((prev)=>(prev - 1))}
            >
              Previous
            </button>}
            {currentPage!==(totalResults/10) ? <button
              type="button"
              className="text-right px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setCurrentPage((prev)=>(prev + 1))}
            >
              Next
            </button>:null}
          </div> : null}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductsPage;
