import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Modal from "react-modal";
Modal.setAppElement("#root");



const ButtonGiphy = ( {setItems} ) => {

  //creating the state
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [gif, setGif] = useState([]);

  //fetching giphy api 
  useEffect(() => {
    const fetchData = async () => {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
           params: {
             api_key: process.env.REACT_APP_API_KEY
           }
        });
        console.log(results.data.data);
        setGif(results.data.data);
    }
    fetchData();
  }, [])

  const clearTextField = () => {
    setSearch('');
  }

  
  //giphy button modal will open
  const toggleModal =(e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }


  //this is for query search 
  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const results = await axios("https://api.giphy.com/v1/gifs/search", {
          params: {
            api_key: "2OHhOWPsFnwvCqCrFJMmgVjcfVb8tX7A",
            q: search,
            limit: 1000,
          }
        });
        setGif(results.data.data);
        } catch (err) {
           console.log(err.message);
        }
  };
  

  return (
    <div>
        <button className="btn-giphy" onClick={toggleModal}>GIPHY</button>
       
       <div className="div-1">
          <Modal className="modal" isOpen={isOpen} onRequestClose={toggleModal} contentLabel="My dialog">
            <div id="search-container">
              <div id="search">
                <input 
                   className="input-gif" 
                   type="text" 
                   placeholder="Search Gif" 
                   onChange={e => setSearch(e.target.value)}
                   value={search}
                />
                <img id="cross" src="./images/x-circle.svg" onClick={() => clearTextField()} alt="remove" />
              </div>
               <button type="submit" onClick={handleSubmit} className="btn-gif-search">Search</button>
            </div>
            <button className="btn-close" onClick={toggleModal}>CLOSE</button>
            <div className="show-gif-container">
              {
                gif.map((element, id) => 
                (
                  <div onClick={() => {
                    setItems(prev => [...prev, {value: element.images.fixed_height.url, type: 'gif'}]);
                    setIsOpen(prev => !prev);
                  }} key={id} className="gif-item">
                      <img src={element.images.fixed_height.url} alt="image"/>
                  </div>
                 ))
              }
            </div>
         </Modal>
        </div> 
    </div>
  )
}

export default ButtonGiphy;
