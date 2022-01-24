import React, { useState, useEffect } from 'react'
import ButtonGiphy from './ButtonGiphy'



const Comment = () => {

  const [text, setText] = useState('');
  const [items, setItems] = useState([]);


  //add the item in an array
  const addItem = (e) => {
    e.preventDefault();
    if(!text)
      return;
      //nothing to do
    setItems([...items, {type: 'text', value: text}]);
    setText('');
    
  }

  //delete the item from an array
  const deleteText = (id) => {
    const updatedItem = items.filter((data, index) => {
      return index !== id;
    });
    setItems(updatedItem);
  }
 

  //add data to local storage
  useEffect(() => {
     localStorage.setItem('container', JSON.stringify(items));
  }, [items])

  return (
    <div className="comment-div">
      <form >
        <h2 className="head">Text-Giphy</h2>
        <div className="comment-container">
           <input 
              className="input-box" 
              type="text" 
              placeholder="Enter the text..."
              value={text}
              onChange={e => setText(e.target.value)}
           />
           <button className="btn-post" onClick={addItem}>POST</button>
        </div>

        <div>
          <ButtonGiphy setItems={setItems} />
        </div>

        <div className="display-result">
            {
              items.map((data, index) => 
               data.type === 'text' ? 
              (
                <div key={index} className="result-text">
                   <h3 className="item-text">{data.value}</h3>
                   <img onClick={() => deleteText(index)} 
                        title="delete" 
                        className="trash" 
                        src="../images/delete-bin-line.svg" 
                        alt="trash" 
                    />
                </div>
              )
              :
              (
                <div key={index} >
                   <img src={data.value} />
                </div>
              ))
            }
        </div>
      </form>
    </div>
  )
}

export default Comment
