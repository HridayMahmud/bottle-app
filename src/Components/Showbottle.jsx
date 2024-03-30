import PropTypes from 'prop-types';
const Showbottle = ({bottle,handleAddtobutton}) => {
    const {image,name,material,color,price} = bottle;

   
    return (
     <>

<div className=" w-[300px] lg:w-[330px] flex justify-center items-center mb-4 flex-col px-10 bg-red-400 rounded-xl shadow-lg shadow-gray-500">

<img className="w-[200px] h-[250px] rounded-xl shadow-lg shadow-gray-600 mt-5 mb-2 " src={image} alt="bottle" />
<h1 className="text-xl text-center">Name:{name}</h1>
<p className="text-lg  font-semibold">Material: {material}</p>
<p className="text-lg font-semibold">Color: {color}</p>
<p className="text-lg font-semibold">price:BDT {price}</p>
<button onClick={()=>handleAddtobutton(bottle)} className="btn controls bg-green-500 mt-2 mb-4">Purchase</button>
</div>
     </>
    );
};

Showbottle.propTypes = {
    bottle:PropTypes.object.isRequired,
    handleAddtobutton:PropTypes.func.isRequired
}
export default Showbottle;