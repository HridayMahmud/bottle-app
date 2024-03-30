

 const getStoredLocalStorageData =()=>{
    
    const parsedStoredData = JSON.parse(localStorage.getItem('cart'));
    if(parsedStoredData){
        return parsedStoredData;
    }
    return [];
 }
 getStoredLocalStorageData();

    const saveToLocalStorage =cart=>{
        const stringifieddata = JSON.stringify(cart);
        localStorage.setItem('cart',stringifieddata);
    }
  const addToLocalStorage = id=>{
     const cart = getStoredLocalStorageData();
     cart.push(id);
      saveToLocalStorage(cart);
     

  }

// const Localstorage = ({data}) => {
//     const {name,capacity} = data;
//     const stringifieddata = JSON.stringify(name,capacity);
//     localStorage.setItem('cart',stringifieddata);
//     const parseddata = JSON.parse(localStorage.getItem('cart'));
//     console.log(parseddata);

//     return (
//         <div>
//             <h1>name:{name}</h1>
//             <h1>capacity:{capacity}</h1>
//         </div>
//     );
// };

export {addToLocalStorage,getStoredLocalStorageData};