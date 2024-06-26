import { useEffect, useState } from "react";
import Showbottle from "./Showbottle";
import { addToLocalStorage, getStoredLocalStorageData, handleDelteFromLocalstorage } from "./Localstorage/Localstorage";





const Fetchbottle = () => {
    
const [bottles,setbottle] = useState([]);
const [addedbottles,setaddedbottles] = useState([]);
const [totalStoredCart,settotalStoredCart] = useState(0);
const [selectedbottles,setSelectedbottles] = useState([]);
const [showsavedcart,setshowsavedcart] = useState('hidden');
const [showVisualcart,setshowVisualcart] = useState('hidden');
const [hidden,sethidden] = useState(false);
const [visualhidden,setvisualhidden] = useState(false);
const [visualCartdisabled,setvisiualCartdisabled] = useState(false);
const [successMessage,setsuccessMessage] = useState(false);
const [deleteMessage,setdeleteMessage] = useState(false);



useEffect(()=>{
    const FetchingbottleData = async ()=>{
        const res = await fetch('bottle.json');
        const datas = await res.json();
        //console.log(datas);
        setbottle(datas);
    }
    FetchingbottleData();
},[])

useEffect(()=>{
    if(bottles.length>0){
        const storedCart = getStoredLocalStorageData();
     
       // console.log('called the useEffect',bottles.length);
          // console.log(storedCart);
        settotalStoredCart(storedCart.length);
        const fetchedId = [];
        for(const x of storedCart){
            //console.log(x);
            //returned single object as fetchingselectedbottles
          const fetchingselectedbottles = bottles.find(bottle=>bottle.id===x);
          //console.log(fetchingselectedbottles);
          if(fetchingselectedbottles){
            fetchedId.push(fetchingselectedbottles);

          }
         // setSelectedbottles(fetchingselectedbottles);
     
          //console.log(fetchedId);
          setSelectedbottles(fetchedId);
         // console.log(selectedbottles);

        }
    }
},[bottles])


const handleAddtobutton =(bottle)=>{ 
    setsuccessMessage(true);
    setTimeout(()=>{
       setsuccessMessage(false);
    },1000)
   
     const newbottle = [...addedbottles,bottle];
     setaddedbottles(newbottle);
    //console.log(bottles)
   // setlocalstorage(newbottle);
    addToLocalStorage(bottle.id);
}

    //handleVisualDelete function
    const handleVisualCartDelete=(id)=>{
        setdeleteMessage(true);
        setTimeout(()=>{
            setdeleteMessage(false);
        },1000)
        const availabeVisualCart = addedbottles;

         const remainingVisualCart = availabeVisualCart.filter(item=>item.id!==id);
         //console.log(remainingVisualCart);
         setaddedbottles(remainingVisualCart);

        
    }
    //handleDeteteFromLocalStorage
    const handleSavedCartDelete = id =>{
        setdeleteMessage(true);
        setTimeout(()=>{
            setdeleteMessage(false);
        },2000)
        console.log('clickedbysavedcart');
        handleDelteFromLocalstorage(id);
    }

    
    //handleShowSavedCart
    const handleShowSavedCart=(hidden)=>{
        if(totalStoredCart){
        hidden ? setshowsavedcart('hidden') : setshowsavedcart('');}
        //console.log('clicked saved cart');
        else{
            alert('Add cart');
        }
        
    }
      //handleShowVisualCart
      const handleShowVisualCart=(visualhidden)=>{
        if(addedbottles.length){
        visualhidden ? setshowVisualcart('hidden') : setshowVisualcart('');}
        //console.log('clicked saved cart');
        else{
            alert('Add cart');
        }
        
    }
   console.log(addedbottles.length)
    return (
        <> 
          <div className="bg-gray-200 space-y-1 p-5 w-[300px] lg:w-full mx-auto text-green-600">
          <h2 className="font-bold">Available bottles:{bottles.length}</h2>
          <h3 className="font-bold">PresentSeletedCart:{addedbottles.length}</h3>
          <h3 className="font-bold mb-2">SavedCart:{totalStoredCart}</h3>
          <button onClick={()=>{totalStoredCart && sethidden(!hidden),handleShowSavedCart(hidden)}} className={`btn mb-3  font-semibold   ${hidden ? 'bg-red-600': 'bg-green-600'} mr-2`}><i class="text-white text-2xl fa-solid fa-cart-shopping"></i>{ hidden?'Hide Saved Cart' :'Show Saved Cart'}</button>
          <button  onClick={()=>{addedbottles.length && setvisualhidden(!visualhidden),handleShowVisualCart(visualhidden)}} className={`btn mt-2   font-semibold  ${visualhidden ? 'bg-red-600': 'bg-green-600'}`}><i class="text-white text-2xl fa-solid fa-cart-shopping"></i>{ visualhidden ?'Hide visual Cart' :'Show visual Cart'}</button>
           <div>
            {
                successMessage && <p className="font-semibold">added successfully!</p>
            }
           </div>
          </div>
          
         
          <div className={`show-selected-bottles ${showsavedcart}  p-5  mx-auto`}>
            <ul className="flex flex-col ">
                {
                selectedbottles.map(eachselectedbottle=><li className="font-semibold text-gray-600" key={eachselectedbottle.id}>
                    <div className="flex flex-col w-[300px] lg:w-[600px] p-4 mx-auto justify-center rounded-xl shadow-lg gap-2 shadow-gray-600 mb-2 items-center">
                    <h4 className="font-bold">{eachselectedbottle.name}</h4>
                    <img className="w-[80px] h-[100px] border-dotted border-[3px] rounded-xl" src={eachselectedbottle.image} alt="" />
                    <h3 className="font-semibold">Price:BDT {eachselectedbottle.price}</h3>
                    <button onClick={()=>handleSavedCartDelete(eachselectedbottle.id)} className="btn controls bg-red-500">Remove cart</button>
                    <div>
                        {
                            deleteMessage && <p className="text-red-900">item removed successfully!</p>
                        }
                    </div>
                    </div></li>) 
                }
            </ul>
          </div>

          <div className={`p-5 ${showVisualcart} mx-auto `}>
            <ul className="flex flex-col ">
                {
                addedbottles.map(addedbottle=><li className="font-semibold text-gray-600" key={addedbottle.id}>
                    <div className="flex flex-col w-[300px] lg:w-[600px] p-4 mx-auto justify-center rounded-xl shadow-lg gap-2 shadow-gray-600 mb-2 items-center">
                    <h4 className="font-bold">{addedbottle.name}</h4>
                    <img className="w-[80px] h-[100px] border-dotted border-[3px] rounded-xl" src={addedbottle.image} alt="" />
                    <h3 className="font-semibold">Price:BDT {addedbottle.price}</h3>
                    <button onClick={()=>handleVisualCartDelete(addedbottle.id)} className="btn controls bg-red-500">Remove cart</button>
                    <div>
                    <div>
                        {
                            deleteMessage && <p className="text-red-900">item removed successfully!</p>
                        }
                    </div>
                    </div>
                    </div></li>) 
                }
            </ul>
          </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
            {
                bottles.map(bottle=><Showbottle key={bottle.id} bottle={bottle}
                    handleAddtobutton={handleAddtobutton} 

                    />)
            }
        </div>
        {/* <div className="localstorage">
            {
                localstorage.map(data=><Localstorage data={data} />)
            }
        </div> */}
        <div>
           
        </div>
        </>
    );
};

export default Fetchbottle;