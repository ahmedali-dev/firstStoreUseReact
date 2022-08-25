import { Routes, Route } from "react-router-dom";
import AddItem from '../component/addItem';
import Home from '../component/Home';
import Cart from '../component/Cart';

const Router = () => {
    return (
        <>
            <Routes>
                {/* product page */}
                <Route path="/product"  element={<Home />}/>
                <Route path="/"  element={<Home />}/>
                <Route path="/product/:id"  element={<Cart />}/>
                <Route path="/:id"  element={<Cart />}/>


                {/* add new product */}
                <Route path="/additem" element={<AddItem />}/>
                
                {/* product cart */}
                <Route path="/cart" element={<Cart />}/>
            </Routes>
        </>
    );
}

export default Router;